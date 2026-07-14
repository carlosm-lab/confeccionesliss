"use client";
// ──────────────────────────────────────────────────────────────
// CONTEXTO DEL CARRITO — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// El corazón de la lógica de ventas. Maneja:
//   - Persistencia en localStorage (guest-first, sin tabla de carritos)
//   - Sincronización con Supabase (user_carts) cuando hay usuario logueado
//   - Revalidación de precios cada 60 segundos
//   - Sync multi-pestaña via StorageEvent
//   - Expiración automática del carrito (7 días de inactividad)
//
// ESTRATEGIA "GUEST-FIRST":
// El carrito vive en localStorage siempre. Si el usuario se loguea:
//   - Carrito local vacío → se hidrata desde DB
//   - Carrito local CON items → SOBREESCRIBE la DB
// Esto prioriza la experiencia del guest que agrega productos
// antes de loguearse (el caso más común en este tipo de tienda).
//
// REVALIDACIÓN DE PRECIOS:
// Cada 60 segundos (si el carrito tiene items y la pestaña es visible),
// se consulta Supabase para verificar que los precios sean correctos
// y que los productos sigan activos. Si un producto fue desactivado
// por el admin, se elimina del carrito con una notificación.
// ──────────────────────────────────────────────────────────────
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { toast } from "react-hot-toast";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useAuth } from "./AuthContext";
import { logger } from "@/lib/logger";
import { useDebounce } from "@/hooks/useDebounce";
import {
  CART_SELECT_COLUMNS,
  MAX_CART_QUANTITY,
  MAX_TOTAL_ITEMS,
  STORAGE_CART_KEY,
  STORAGE_CART_TIMESTAMP_KEY,
  STORAGE_CART_EXPIRED_KEY,
} from "@/lib/constants";
import type { ShippingInfo } from "@/lib/shipping";
import { useNotifications } from "@/context/NotificationContext";

// ── Tipos ─────────────────────────────────────────────────────

interface CartProduct {
  id: string;
  name: string;
  price: number;
  old_price?: number | null;
  image_path?: string | null;
  images?: string[] | null;
  slug?: string | null;
  offer_ends_at?: string | null;
  offer_starts_at?: string | null;
  is_active?: boolean;
  sector?: string | null;
  category?: string | null;
  categories?: { name: string; catalog: string } | null;
  /** Talla seleccionada por el usuario */
  selectedSize?: string | null;
  /** Modo de precio: 'normal' | 'wholesale' | 'labor' */
  priceMode?: "normal" | "wholesale" | "labor";
}

interface CartItem {
  id: string; // UUID local de la línea del carrito
  product: CartProduct;
  quantity: number;
  color: string | null;
  note: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (
    product: CartProduct,
    quantity?: number,
    color?: string | null,
    note?: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  refreshCartPrices: () => Promise<void>;
  isRefreshingPrices: boolean;
  arePricesStale: boolean;
  consecutiveRefreshFailures: number;
  /** Información de envío seleccionada por el usuario */
  shippingInfo: ShippingInfo | null;
  setShippingInfo: (info: ShippingInfo | null) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// Estado por defecto — carrito vacío para cuando CartProvider aún no se ha montado
const CART_EMPTY_DEFAULT: CartContextValue = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
  refreshCartPrices: async () => {},
  isRefreshingPrices: false,
  arePricesStale: false,
  consecutiveRefreshFailures: 0,
  shippingInfo: null,
  setShippingInfo: () => {},
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  // Null-safe: devuelve carrito vacío cuando CartProvider aún no se ha montado
  return ctx ?? CART_EMPTY_DEFAULT;
};

/**
 * Genera un UUID v4 compatible con todos los contextos de browser.
 * crypto.randomUUID() requiere HTTPS o localhost — falla en móvil accediendo
 * via IP de red local (192.168.x.x). crypto.getRandomValues() está disponible
 * incluso sin HTTPS en navegadores modernos y es criptográficamente seguro.
 */
function generateId(): string {
  // Preferir crypto.randomUUID si está disponible (contexto seguro: HTTPS / localhost)
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // Fallback seguro: crypto.getRandomValues — disponible sin HTTPS en móviles modernos
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues === "function"
  ) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // versión 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variante RFC 4122
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  // Sin Web Crypto API disponible — lanzar error explícito en lugar de fallar silenciosamente
  throw new Error(
    "Web Crypto API no disponible. Accede al sitio via HTTPS o localhost."
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { addLocalNotification } = useNotifications();

  // ── Inicialización desde localStorage ────────────────────────
  // Incluye expiración de 7 días de inactividad.
  // GUARD SSR: el lazy initializer corre en el servidor (Next.js SSR)
  // donde localStorage no existe. Retornar [] en SSR y dejar que el
  // useEffect de persistencia hidrate el estado en el cliente.
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_CART_KEY);
      const timestamp = localStorage.getItem(STORAGE_CART_TIMESTAMP_KEY);

      // Expiración de 7 días
      if (saved && timestamp) {
        const now = Date.now();
        const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

        if (now - parseInt(timestamp, 10) > SEVEN_DAYS) {
          localStorage.removeItem(STORAGE_CART_KEY);
          localStorage.removeItem(STORAGE_CART_TIMESTAMP_KEY);
          localStorage.setItem(STORAGE_CART_EXPIRED_KEY, "true");
          return [];
        }
        return JSON.parse(saved) as CartItem[];
      }

      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch (e) {
      logger.error(
        "Error parsing cart from localStorage, cleaning up corrupted data:",
        e
      );
      try {
        localStorage.removeItem(STORAGE_CART_KEY);
        localStorage.removeItem(STORAGE_CART_TIMESTAMP_KEY);
      } catch (cleanupErr) {
        logger.error("Error cleaning up localStorage:", cleanupErr);
      }
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRefreshingPrices, setIsRefreshingPrices] = useState(false);
  const [consecutiveRefreshFailures, setConsecutiveRefreshFailures] =
    useState(0);
  const [lastSuccessfulRefresh, setLastSuccessfulRefresh] = useState(
    Date.now()
  );
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  // Debounce de 1.5s para sincronización con DB
  const debouncedCartItems = useDebounce(cartItems, 1500);
  const cartItemsRef = useRef<CartItem[]>(cartItems);

  useEffect(() => {
    cartItemsRef.current = cartItems;
  }, [cartItems]);

  // Ref para llamar refreshCartPrices desde el sync effect sin añadirla a sus deps.
  // Se actualiza en render (síncrono) para que el effect siempre vea el valor actual.
  const refreshCartPricesRef = useRef<() => Promise<void>>(() =>
    Promise.resolve()
  );

  // ── Sync multi-pestaña ────────────────────────────────────────
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_CART_KEY) {
        try {
          const newCart = e.newValue
            ? (JSON.parse(e.newValue) as CartItem[])
            : [];
          setCartItems(newCart);
        } catch (err) {
          logger.error("Error parsing cart from storage event:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Toast si el carrito expiró (flag del init)
    if (localStorage.getItem(STORAGE_CART_EXPIRED_KEY) === "true") {
      setTimeout(() => {
        toast("Tu carrito ha expirado por inactividad.", {
          icon: "🕒",
          duration: 4000,
        });
        localStorage.removeItem(STORAGE_CART_EXPIRED_KEY);
      }, 1000);
    }

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ── Persistencia en localStorage ──────────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartItems));
    if (cartItems.length === 0) {
      localStorage.removeItem(STORAGE_CART_TIMESTAMP_KEY);
    }
  }, [cartItems]);

  const lastSyncedCartRef = useRef<CartItem[]>(cartItems);

  // ── Sync a Supabase (usuario logueado) ───────────────────────
  // Upsert con debounce de 1.5s. Si falla, hace rollback optimista.
  useEffect(() => {
    if (user && debouncedCartItems.length >= 0) {
      if (
        JSON.stringify(debouncedCartItems) ===
        JSON.stringify(lastSyncedCartRef.current)
      )
        return;

      const supabase = getSupabaseClient();
      supabase
        .from("user_carts")
        .upsert(
          {
            user_id: user.id,
            cart_items: debouncedCartItems,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        )
        .then(
          ({
            error,
          }: {
            error: { message?: string; code?: string } | null;
          }) => {
            if (error) {
              const isEmptyError =
                typeof error === "object" && Object.keys(error).length === 0;

              const isDuplicateKeyError =
                (error as { code?: string })?.code === "23505";

              if (isEmptyError || isDuplicateKeyError) {
                logger.warn(
                  "Cart sync silently blocked (RLS / missing table / duplicate key). Cart is local-only."
                );
              } else {
                // Error real de Supabase — logueamos pero NO hacemos rollback.
                // El carrito en localStorage es la fuente de verdad.
                // El usuario mantiene sus productos; se reintentará en el próximo debounce.
                logger.error("Error syncing cart to DB:", error);
              }
              // En todos los casos de error, actualizar ref para evitar re-intentos en bucle
              lastSyncedCartRef.current = debouncedCartItems;
            } else {
              lastSyncedCartRef.current = debouncedCartItems;
            }
          }
        );
    }
  }, [debouncedCartItems, user]);

  // ── Hidratación desde DB al login ─────────────────────────────
  // Guest-First: carrito local gana. Si está vacío, carga desde DB.
  useEffect(() => {
    let isMounted = true;

    const syncAndRevalidate = async () => {
      const supabase = getSupabaseClient();

      // Caso 1: Usuario logueado + carrito local vacío → hidratar desde DB
      if (user && cartItemsRef.current.length === 0) {
        const { data, error } = await supabase
          .from("user_carts")
          .select("cart_items")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!error && data?.cart_items && data.cart_items.length > 0) {
          if (cartItemsRef.current.length === 0 && isMounted) {
            const ids = [
              ...new Set(
                (data.cart_items as CartItem[]).map((i) => i.product.id)
              ),
            ];
            const pRes = await supabase
              .from("products")
              .select(CART_SELECT_COLUMNS)
              .in("id", ids);

            if (pRes.data) {
              const pMap = Object.fromEntries(
                pRes.data.map((p: CartProduct) => [p.id, p])
              );
              const validated = (data.cart_items as CartItem[])
                .filter((i) => pMap[i.product.id]?.is_active)
                .map((i) => {
                  const fresh = pMap[i.product.id];
                  return {
                    ...i,
                    product: {
                      ...i.product,
                      name: fresh.name,
                      price: fresh.price,
                      old_price: fresh.old_price,
                      offer_ends_at: fresh.offer_ends_at,
                      offer_starts_at: fresh.offer_starts_at,
                      image_path: fresh.image_path,
                      images: fresh.images,
                      slug: fresh.slug,
                    },
                  };
                });
              if (isMounted && cartItemsRef.current.length === 0) {
                setCartItems(validated);
                lastSyncedCartRef.current = validated;
              }
            } else if (isMounted && cartItemsRef.current.length === 0) {
              setCartItems(data.cart_items as CartItem[]);
              lastSyncedCartRef.current = data.cart_items as CartItem[];
            }
            return;
          }
        }
      }

      // Caso 2: Hay items locales → revalidar precios
      // (refreshCartPrices ya maneja internamente el guard de guest)
      if (cartItemsRef.current.length > 0 && isMounted) {
        await refreshCartPricesRef.current();
      }
    };

    syncAndRevalidate();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // ── Revalidación de precios ───────────────────────────────────
  const refreshCartPrices = useCallback(async () => {
    // Guests: omitir — RLS bloquea lecturas anon de products desde el cliente
    // navegador. La función se recrea al login/logout (dep: user) y el polling
    // effect lo detecta y reinicia el interval automáticamente.
    if (!user) return;

    if (document.hidden) return;

    // Usamos cartItemsRef.current solo para saber si el carrito está vacío
    // y para construir la lista de IDs a consultar en Supabase.
    // El setCartItems usa FORMA FUNCIONAL para operar sobre el estado actual de React
    // (no el ref, que puede estar stale si este effect corre antes de que el ref se actualice).
    const snapshotCart = cartItemsRef.current;
    if (snapshotCart.length === 0) return;

    setIsRefreshingPrices(true);
    try {
      const supabase = getSupabaseClient();
      const idsToCheck = [...new Set(snapshotCart.map((i) => i.product.id))];
      const { data, error } = await supabase
        .from("products")
        .select(CART_SELECT_COLUMNS)
        .in("id", idsToCheck);

      if (error) throw error;

      // GUARD: Supabase devolvió vacío → RLS bloqueó la lectura (guest sin permiso,
      // proyecto pausado, etc.). NO modificar el carrito — mantener precios cacheados.
      if (!data || data.length === 0) {
        logger.warn(
          "refreshCartPrices: Supabase returned empty — keeping cached cart. (RLS/network/guest)"
        );
        setConsecutiveRefreshFailures((prev) => prev + 1);
        return;
      }

      const productMap = Object.fromEntries(
        data.map((p: CartProduct) => [p.id, p])
      );

      // IMPORTANTE: usamos setCartItems con FORMA FUNCIONAL (prevCart) para operar
      // sobre el estado ACTUAL de React, no sobre snapshotCart (que puede estar stale
      // cuando este callback corre justo después de addToCart por la race condition
      // de React effects: hijos antes que padres).
      let itemsRemovedFlag = false;

      setCartItems((prevCart) => {
        let changed = false;
        const nextCart = prevCart
          .filter((item) => {
            const fresh = productMap[item.product.id];
            // Producto no devuelto por Supabase → conservar (guest RLS parcial,
            // o producto recién añadido cuyo ID no estaba en snapshotCart)
            if (!fresh) return true;
            // Solo eliminar si Supabase confirma explícitamente que está inactivo
            if (fresh.is_active === false) {
              changed = true;
              itemsRemovedFlag = true;
              return false;
            }
            return true;
          })
          .map((item) => {
            const fresh = productMap[item.product.id];
            if (!fresh) return item; // Sin datos frescos → mantener precio cacheado
            // Detectar si algún campo cambió para activar la flag
            if (
              fresh.name !== item.product.name ||
              fresh.price !== item.product.price ||
              fresh.old_price !== item.product.old_price ||
              fresh.image_path !== item.product.image_path ||
              fresh.slug !== item.product.slug
            ) {
              changed = true;
            }
            return {
              ...item,
              product: {
                ...item.product,
                name: fresh.name,
                price: fresh.price,
                old_price: fresh.old_price,
                offer_ends_at: fresh.offer_ends_at,
                offer_starts_at: fresh.offer_starts_at,
                image_path: fresh.image_path,
                images: fresh.images,
                slug: fresh.slug,
              },
            };
          });

        // Si hay diferencias reales, devolver el nuevo array; si no, devolver prev
        // para evitar re-renders innecesarios
        return changed || nextCart.length !== prevCart.length
          ? nextCart
          : prevCart;
      });

      if (itemsRemovedFlag) {
        toast("Un producto en tu carrito se ha agotado o desactivado.", {
          icon: "⚠️",
          duration: 5000,
        });
      }

      setConsecutiveRefreshFailures(0);
      setLastSuccessfulRefresh(Date.now());
    } catch (err) {
      const isEmptyError =
        !err ||
        (typeof err === "object" &&
          Object.keys(err).length === 0 &&
          !(err instanceof Error));

      if (isEmptyError) {
        logger.warn(
          "Cart price refresh blocked (RLS/network). Using cached prices."
        );
      } else {
        logger.error("Error refreshing cart prices:", {
          message: (err as Error)?.message ?? String(err),
          code: (err as { code?: string })?.code,
          details: (err as { details?: string })?.details,
          hint: (err as { hint?: string })?.hint,
        });
      }
      setConsecutiveRefreshFailures((prev) => prev + 1);
      // IMPORTANTE: NO modificar cartItems cuando hay error — mantener estado actual
    } finally {
      setIsRefreshingPrices(false);
    }
  }, [user]);

  // Mantener ref actualizado en efecto para que el sync effect
  // siempre use la última versión de refreshCartPrices.
  useEffect(() => {
    refreshCartPricesRef.current = refreshCartPrices;
  }, [refreshCartPrices]);

  // ── Polling de revalidación cada 60s ─────────────────────────
  // refreshCartPrices incluye el guard de usuario en su interior;
  // cuando user cambia, la función se recrea y este effect se reinicia.
  useEffect(() => {
    if (cartItems.length === 0) return;
    const interval = setInterval(refreshCartPrices, 60000);
    return () => clearInterval(interval);
  }, [cartItems.length, refreshCartPrices]);

  // ── API del carrito ───────────────────────────────────────────
  const addToCart = (
    product: CartProduct,
    quantity = 1,
    color: string | null = null,
    note = ""
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.color === color &&
          item.note === note
      );

      if (existing) {
        if (existing.quantity + quantity > MAX_CART_QUANTITY) {
          toast.error(
            `Límite máximo por producto: ${MAX_CART_QUANTITY} unidades`
          );
          return prev;
        }
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      if (quantity > MAX_CART_QUANTITY) {
        toast.error(
          `Límite máximo por producto: ${MAX_CART_QUANTITY} unidades`
        );
        return prev;
      }

      if (prev.length >= MAX_TOTAL_ITEMS) {
        toast.error(
          `Límite máximo en el carrito: ${MAX_TOTAL_ITEMS} productos diferentes`
        );
        return prev;
      }

      const newItem: CartItem = {
        id: generateId(),
        product,
        quantity,
        color,
        note,
      };

      return [...prev, newItem];
    });

    // Timestamp de actividad (para expiración de 7 días)
    localStorage.setItem(STORAGE_CART_TIMESTAMP_KEY, Date.now().toString());

    // Notificación guest — solo para usuarios no autenticados
    if (!user) {
      addLocalNotification({
        type: "cart_hint",
        title: "Articulos en el carrito",
        message:
          "Inicia sesión para guardar tu carrito y acceder desde cualquier dispositivo.",

        target_url: null,
      });
    }

    toast.success(`${quantity}x ${product.name} agregado al carrito`, {
      id: "cart-add-toast",
      icon: "🛍️",
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    if (quantity > MAX_CART_QUANTITY) {
      toast.error(
        `Límite máximo por producto es ${MAX_CART_QUANTITY} unidades`
      );
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Precios se consideran stale si: 3+ fallos consecutivos
  // O más de 5 minutos sin refresh exitoso.
  // NOTA: Solo se muestra como advertencia — NO bloquea el checkout.
  // Los usuarios guest no pueden hacer refresh via Supabase (RLS), por eso
  // no queremos bloquear su carrito solo porque no tienen auth.
  const arePricesStale =
    consecutiveRefreshFailures >= 3 ||
    Date.now() - lastSuccessfulRefresh > 5 * 60 * 1000;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        refreshCartPrices,
        isRefreshingPrices,
        arePricesStale,
        consecutiveRefreshFailures,
        shippingInfo,
        setShippingInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
