import type{ Product, User } from '../types';

export const DUMMY_USERS: User[] = [
  {
    id: 'u1',
    email: 'demo@ecofinds.com',
    name: 'Eco Enthusiast',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    joinedDate: '2023-01-15',
  },
  {
    id: 'u2',
    email: 'seller@ecofinds.com',
    name: 'Vintage Seller',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    joinedDate: '2023-03-20',
  }
];

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Vintage Denim Jacket',
    price: 45.00,
    category: 'Clothing',
    description: 'Classic 90s denim jacket in great condition. Size M.',
    imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&h=500&fit=crop',
    sellerId: 'u2',
    createdAt: '2023-10-01',
  },
  {
    id: 'p2',
    title: 'Wooden Coffee Table',
    price: 120.00,
    category: 'Home',
    description: 'Handcrafted oak coffee table. Minimalist design.',
    imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&h=500&fit=crop',
    sellerId: 'u2',
    createdAt: '2023-10-05',
  },
  {
    id: 'p3',
    title: 'Sony WH-1000XM4 Headphones',
    price: 180.00,
    category: 'Electronics',
    description: 'Noise cancelling headphones, barely used. Comes with case.',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop',
    sellerId: 'u1',
    createdAt: '2023-10-10',
  },
  {
    id: 'p4',
    title: 'Yoga Mat - Eco Friendly',
    price: 25.00,
    category: 'Sports',
    description: 'Cork yoga mat, non-slip and sustainable.',
    imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a9?w=500&h=500&fit=crop',
    sellerId: 'u1',
    createdAt: '2023-10-12',
  },
  {
    id: 'p5',
    title: 'Plant Pot Set',
    price: 30.00,
    category: 'Home',
    description: 'Set of 3 ceramic plant pots. White and gold.',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
    sellerId: 'u2',
    createdAt: '2023-10-15',
  }
];
