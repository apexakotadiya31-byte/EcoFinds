import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, checkout } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    if (window.confirm(`Confirm purchase of $${cartTotal.toFixed(2)}?`)) {
      checkout();
      navigate('/purchases');
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-green-50 p-6">
          <ShoppingBag className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>
        <Link to="/feed" className="mt-6">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Shopping Cart ({items.length} items)</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <Link to={`/product/${product.id}`} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </Link>
              
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <Link to={`/product/${product.id}`} className="font-medium text-gray-900 hover:text-green-600">
                      {product.title}
                    </Link>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="font-medium text-gray-900">${(product.price * quantity).toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center rounded-md border border-gray-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-base font-medium text-gray-900">Order Total</div>
              <div className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</div>
            </div>
          </div>
          <Button className="mt-6 w-full" size="lg" onClick={handleCheckout}>
            Checkout <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-4 text-center text-xs text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
};
