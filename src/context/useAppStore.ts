import { create } from "zustand";

interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  talla: string;
  color: string;
  imagen: string | null;
}

interface UserProfile {
  id: string;
  nombre: string;
  email: string;
  avatar: string | null;
  primerLogin: boolean;
  rol?: string;
  institucion?: string;
}

interface AppState {
  // Menú móvil
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  // Carrito de compras
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;

  // Notificaciones
  notifCount: number;
  setNotifCount: (n: number) => void;

  // Usuario autenticado
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Menú
  isMenuOpen: false,
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  // Carrito
  cartItems: [],
  cartCount: 0,
  addToCart: (item) =>
    set((s) => {
      const existing = s.cartItems.find(
        (i) =>
          i.id === item.id && i.talla === item.talla && i.color === item.color
      );
      if (existing) {
        const updated = s.cartItems.map((i) =>
          i.id === item.id && i.talla === item.talla && i.color === item.color
            ? { ...i, cantidad: i.cantidad + item.cantidad }
            : i
        );
        return { cartItems: updated, cartCount: s.cartCount + item.cantidad };
      }
      return {
        cartItems: [...s.cartItems, item],
        cartCount: s.cartCount + item.cantidad,
      };
    }),
  removeFromCart: (id) =>
    set((s) => {
      const item = s.cartItems.find((i) => i.id === id);
      return {
        cartItems: s.cartItems.filter((i) => i.id !== id),
        cartCount: s.cartCount - (item?.cantidad ?? 0),
      };
    }),
  updateQuantity: (id, cantidad) =>
    set((s) => ({
      cartItems: s.cartItems.map((i) => (i.id === id ? { ...i, cantidad } : i)),
      cartCount: s.cartItems.reduce(
        (acc, i) => acc + (i.id === id ? cantidad : i.cantidad),
        0
      ),
    })),
  clearCart: () => set({ cartItems: [], cartCount: 0 }),

  // Notificaciones
  notifCount: 3,
  setNotifCount: (n) => set({ notifCount: n }),

  // Usuario
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, cartItems: [], cartCount: 0, notifCount: 0 }),
}));

export type { CartItem, UserProfile };
