import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { Plus, PackageX } from 'lucide-react';

export const MyListings: React.FC = () => {
  const { user } = useAuth();
  const { products, deleteProduct } = useProducts(); // <--- Get ALL products

  // --- THE FIX: FILTER THEM HERE ---
  // We take the big list and keep only the ones where sellerId matches the current user
  const myListings = products.filter(product => product.sellerId === user?.id);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await deleteProduct(id);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your listings</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
        <Link to="/sell">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Listing
          </Button>
        </Link>
      </div>

      {myListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-12 border-2 border-dashed border-gray-200">
          <PackageX className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No listings yet</h3>
          <p className="mt-1 text-gray-500">Start selling your items today!</p>
          <Link to="/sell" className="mt-6">
            <Button variant="outline">Create your first listing</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myListings.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <Link to={`/sell/${product.id}`}>
                    <Button size="sm" variant="secondary" className="shadow-sm">Edit</Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="danger" 
                    className="shadow-sm bg-red-100 text-red-600 hover:bg-red-200"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};