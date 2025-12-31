export type Category = 'Electronics' | 'Clothing' | 'Home' | 'Books' | 'Sports' | 'Other';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  joinedDate: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  category: Category;
  description: string;
  imageUrl: string;
  sellerId: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}
