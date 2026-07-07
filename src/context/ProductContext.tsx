import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types';
import { DUMMY_PRODUCTS } from '../data/dummy'; // Imported dummy data

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  addProduct: (productData: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Seed with dummy products initially so the feed is never empty
  const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  // Helper utility to normalize backend MongoDB objects safely
  const normalizeProduct = (prod: any): Product => ({
    ...prod,
    id: prod.id || prod._id, 
  });

  // 1. Fetch products from Backend on load
  const refreshProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      
      // If the backend returns data and it's not empty, update our state
      if (Array.isArray(data) && data.length > 0) {
        const safeData = data.map(normalizeProduct);
        setProducts(safeData);
      } else {
        // Fallback to dummy data if database collection is empty
        setProducts(DUMMY_PRODUCTS);
      }
    } catch (error) {
      console.error("Error fetching products, falling back to dummy data:", error);
      // Keep dummy products on screen if API call fails entirely
      setProducts(DUMMY_PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // 2. Add Product (Send to MongoDB)
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to add product');
      }

      const newProduct = await response.json();
      setProducts(prev => [normalizeProduct(newProduct), ...prev]);
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  // 3. Update Product
  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Failed to update product');
      
      const updatedProduct = await response.json();
      setProducts(prev => prev.map(p => p.id === id ? normalizeProduct(updatedProduct) : p));
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  // 4. Delete Product
  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  const getProduct = (id: string) => products.find(p => p.id === id);

  return (
    <ProductContext.Provider value={{ 
      products, 
      isLoading, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      getProduct,
      refreshProducts 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};