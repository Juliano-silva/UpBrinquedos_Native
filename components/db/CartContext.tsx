import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  pricePerDay: string;
  startDate: string;
  endDate: string;
  days: number;
  image: any;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize with one default item as requested to show how the cart populates, similar to the original app
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Pula Pula Infantil",
      price: 150.0,
      pricePerDay: "150.00",
      startDate: "15/06/2026",
      endDate: "16/06/2026",
      days: 1,
      image: require("../../assets/icon.png"),
    },
  ]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
