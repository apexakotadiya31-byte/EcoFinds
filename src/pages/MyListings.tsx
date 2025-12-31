import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Edit, Trash2, PlusCircle, PackageOpen } from 'lucide-react';

export const MyListings: React.FC = () => {
  const { user } = useAuth();
  const { userProducts, deleteProduct } = useProducts();

  const myListings = user ? userProducts(user.id) : [];

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
        <Link to="/add-product">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      {myListings.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-200">
            {myListings.map((product) => (
              <li key={product.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.category} • ${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Link to={`/edit-product/${product.id}`}>
                    <Button variant="secondary" size="sm" className="gap-1">
                      <Edit className="h-3 w-3" /> Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
          <PackageOpen className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No listings yet</h3>
          <p className="mt-2 text-gray-500">Start selling your eco-friendly items today!</p>
          <Link to="/add-product" className="mt-4">
            <Button>Create your first listing</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
