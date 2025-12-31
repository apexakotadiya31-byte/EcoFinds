import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ShoppingCart, Tag, User as UserIcon, Calendar } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = getProduct(id || '');

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Button variant="ghost" onClick={() => navigate('/feed')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Feed
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 pl-0 hover:bg-transparent hover:text-green-600">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              <Tag className="mr-1.5 h-3 w-3" />
              {product.category}
            </span>
          </div>

          <h1 className="mb-2 text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mb-6 text-3xl font-bold text-green-600">${product.price.toFixed(2)}</p>

          <div className="mb-8 space-y-4 border-t border-b border-gray-200 py-6">
            <div className="flex items-center text-sm text-gray-600">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Seller ID: {product.sellerId}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Listed on {new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-2 text-lg font-medium text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-auto">
            <Button 
              size="lg" 
              className="w-full gap-2"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
