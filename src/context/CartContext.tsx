import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product, Purchase } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  checkout: () => void;
  purchases: Purchase[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('ecofinds_cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
    const storedPurchases = localStorage.getItem('ecofinds_purchases');
    if (storedPurchases) {
      setPurchases(JSON.parse(storedPurchases));
    }
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('ecofinds_cart', JSON.stringify(newItems));
  };

  const addToCart = (product: Product) => {
    const existingItem = items.find(item => item.product.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      saveCart([...items, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    saveCart(items.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    saveCart(items.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const checkout = () => {
    const newPurchase: Purchase = {
      id: `order_${Date.now()}`,
      items: [...items],
      total: cartTotal,
      date: new Date().toISOString(),
    };
    const newPurchases = [newPurchase, ...purchases];
    setPurchases(newPurchases);
    localStorage.setItem('ecofinds_purchases', JSON.stringify(newPurchases));
    clearCart();
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      itemCount,
      checkout,
      purchases
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
