import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import type { Category } from '../types';
import { Filter, X } from 'lucide-react';

const CATEGORIES: Category[] = ['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Other'];

export const Feed: React.FC = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  
  const searchQuery = searchParams.get('q') || '';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const clearSearch = () => {
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {searchQuery ? `Results for "${searchQuery}"` : 'Fresh Finds'}
        </h1>
        
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Filter className="h-5 w-5 text-gray-500" />
          <button
            onClick={() => setSelectedCategory('All')}
            className={`whitespace-nowrap rounded-full px-4 py-1 text-sm font-medium transition-colors ${
              selectedCategory === 'All' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-1 text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {searchQuery && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Active search: <strong>{searchQuery}</strong></span>
          <button onClick={clearSearch} className="text-red-500 hover:text-red-600 flex items-center">
            <X className="h-4 w-4 mr-1" /> Clear
          </button>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gray-100 p-4">
            <Filter className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button 
            onClick={() => {
              setSearchParams({});
              setSelectedCategory('All');
            }}
            className="mt-4 text-green-600 hover:text-green-500 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
