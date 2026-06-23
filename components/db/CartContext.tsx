import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export interface RentalData {
  dataInicial: string;
  dataFinal: string;
  municipio: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  cep: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  rentalData: RentalData | null;
  isRentalLoading: boolean;
  saveRentalData: (data: RentalData) => Promise<void>;
  clearRentalData: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [rentalData, setRentalData] = useState<RentalData | null>(null);
  const [isRentalLoading, setIsRentalLoading] = useState(true);

  // Load rental data from AsyncStorage on mount
  useEffect(() => {
    const loadRentalData = async () => {
      try {
        const stored = await AsyncStorage.getItem("@dados_aluguel");
        if (stored) {
          setRentalData(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Error loading rental data from AsyncStorage:", e);
      } finally {
        setIsRentalLoading(false);
      }
    };
    loadRentalData();
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const saveRentalData = async (data: RentalData) => {
    try {
      await AsyncStorage.setItem("@dados_aluguel", JSON.stringify(data));
      setRentalData(data);
    } catch (e) {
      console.error("Error saving rental data:", e);
      throw e;
    }
  };

  const clearRentalData = async () => {
    try {
      await AsyncStorage.removeItem("@dados_aluguel");
      setRentalData(null);
      // Clean the cart when changing rental dates/address to avoid mismatching dates
      clearCart();
    } catch (e) {
      console.error("Error clearing rental data:", e);
      throw e;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        rentalData,
        isRentalLoading,
        saveRentalData,
        clearRentalData,
      }}
    >
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
