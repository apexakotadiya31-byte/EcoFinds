import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';
import { DUMMY_PRODUCTS } from '../data/dummy';

interface ProductContextType {
  products: Product[];
  userProducts: (userId: string) => Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('ecofinds_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(DUMMY_PRODUCTS);
      localStorage.setItem('ecofinds_products', JSON.stringify(DUMMY_PRODUCTS));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('ecofinds_products', JSON.stringify(newProducts));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    saveProducts([newProduct, ...products]);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    const newProducts = products.map(p => p.id === id ? { ...p, ...data } : p);
    saveProducts(newProducts);
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter(p => p.id !== id);
    saveProducts(newProducts);
  };

  const getProduct = (id: string) => products.find(p => p.id === id);

  const userProducts = (userId: string) => products.filter(p => p.sellerId === userId);

  return (
    <ProductContext.Provider value={{ products, userProducts, addProduct, updateProduct, deleteProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
