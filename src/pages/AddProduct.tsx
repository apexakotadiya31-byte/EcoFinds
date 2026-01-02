import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { Category } from '../types';
import { ImagePlus, ArrowLeft } from 'lucide-react';

const CATEGORIES: Category[] = ['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Other'];

export const AddProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addProduct, getProduct, updateProduct } = useProducts();

  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Category>('Other');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const product = getProduct(id);
      if (product) {
        if (product.sellerId !== user?.id) {
          navigate('/my-listings'); // Not authorized
          return;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(product.title);
        setPrice(product.price.toString());
        setCategory(product.category);
        setDescription(product.description);
        setImageUrl(product.imageUrl);
      } else {
        navigate('/my-listings');
      }
    }
  }, [isEditMode, id, getProduct, user, navigate]);

  const handleImageUpload = () => {
    // Simulate upload by picking a random image based on category
    const keywords = {
      'Electronics': 'tech',
      'Clothing': 'fashion',
      'Home': 'furniture',
      'Books': 'book',
      'Sports': 'sport',
      'Other': 'object'
    };
    const keyword = keywords[category] || 'random';
    const randomId = Math.floor(Math.random() * 1000);
    setImageUrl(`https://source.unsplash.com/random/500x500/?${keyword}&sig=${randomId}`);
    // Fallback if source.unsplash is flaky, use direct unsplash ID or similar service
    // Actually source.unsplash is deprecated/unreliable. Let's use a fixed set or specific URLs if possible.
    // Or just use the one from dummy data style.
    setImageUrl(`https://images.unsplash.com/photo-${randomId}?w=500&h=500&fit=crop&auto=format`); 
    // Wait, that's not a valid ID.
    // Let's just use a placeholder service that is reliable.
    setImageUrl(`https://placehold.co/500x500?text=${encodeURIComponent(title || 'Product')}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const productData = {
      title,
      price: parseFloat(price),
      category,
      description,
      imageUrl: imageUrl || `https://placehold.co/500x500?text=${encodeURIComponent(title)}`,
      sellerId: user!.id,
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isEditMode && id) {
      updateProduct(id, productData);
    } else {
      addProduct(productData);
    }

    setIsLoading(false);
    navigate('/my-listings');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Listing' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <Input
          label="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g., Vintage Camera"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Price ($)"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="0.00"
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-3"
            placeholder="Describe your item..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Product Image</label>
          <div className="flex items-center gap-4">
            <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <ImagePlus className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <Button type="button" variant="secondary" onClick={handleImageUpload}>
              Generate Placeholder
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            * In a real app, this would be a file upload. Here we generate a placeholder.
          </p>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {isEditMode ? 'Save Changes' : 'Publish Listing'}
          </Button>
        </div>
      </form>
    </div>
  );
};
