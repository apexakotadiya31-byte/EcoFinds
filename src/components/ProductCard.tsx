import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <span className="inline-block rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            {product.category}
          </span>
        </div>
        <Link to={`/product/${product.id}`} className="mb-2 block">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-green-600">
            {product.title}
          </h3>
        </Link>
        <p className="mb-4 text-sm text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="rounded-full w-10 h-10 p-0"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
