import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package, Calendar } from 'lucide-react';

export const Purchases: React.FC = () => {
  const { purchases } = useCart();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>

      {purchases.length > 0 ? (
        <div className="space-y-6">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span className="font-medium text-gray-900">Order #{purchase.id.slice(-6)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(purchase.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="font-medium text-gray-900">
                  Total: ${purchase.total.toFixed(2)}
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {purchase.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 sm:p-6">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        <Link to={`/product/${product.id}`} className="hover:text-green-600">
                          {product.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-gray-500">Qty: {quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
          <Package className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No purchases yet</h3>
          <p className="mt-2 text-gray-500">Items you buy will appear here.</p>
          <Link to="/feed" className="mt-4 text-green-600 hover:text-green-500 font-medium">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};
