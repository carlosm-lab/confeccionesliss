import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen_url?: string;
  talla?: string;
  color?: string;
}

interface CarritoState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, talla?: string, color?: string) => void;
  updateQuantity: (
    id: string,
    cantidad: number,
    talla?: string,
    color?: string
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCarrito = create<CarritoState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === newItem.id &&
              item.talla === newItem.talla &&
              item.color === newItem.color
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id &&
                item.talla === newItem.talla &&
                item.color === newItem.color
                  ? { ...item, cantidad: item.cantidad + newItem.cantidad }
                  : item
              ),
            };
          }

          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (id, talla, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.id === id && item.talla === talla && item.color === color)
          ),
        }));
      },
      updateQuantity: (id, cantidad, talla, color) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.talla === talla && item.color === color
              ? { ...item, cantidad: Math.max(1, cantidad) }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + (item.cantidad || 0),
          0
        );
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.precio * (item.cantidad || 0),
          0
        );
      },
    }),
    {
      name: "carrito-storage",
    }
  )
);
