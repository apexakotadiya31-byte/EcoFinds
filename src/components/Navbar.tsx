import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Menu, X, ShoppingCart, User, LogOut, PlusCircle, Search, Leaf } from 'lucide-react';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/feed?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">EcoFinds</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <form onSubmit={handleSearch} className="w-full max-w-md relative">
              <input
                type="text"
                placeholder="Search for sustainable products..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/feed" className={`text-sm font-medium transition-colors hover:text-green-600 ${isActive('/feed') ? 'text-green-600' : 'text-gray-700'}`}>
              Browse
            </Link>
            
            {user ? (
              <>
                <Link to="/add-product">
                  <Button variant="primary" size="sm" className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Sell Item
                  </Button>
                </Link>
                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-green-600">
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-3 hover:bg-gray-50">
                    <img 
                      src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}`} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700">{user.name.split(' ')[0]}</span>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block hover:block">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <Link to="/my-listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Listings</Link>
                    <Link to="/purchases" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Purchases</Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <Link to="/cart" className="relative p-2 text-gray-700">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <form onSubmit={handleSearch} className="mb-4 mt-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link 
              to="/feed" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Products
            </Link>
            {user ? (
              <>
                <Link 
                  to="/add-product" 
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sell Item
                </Link>
                <Link 
                  to="/dashboard" 
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/my-listings" 
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link 
                  to="/purchases" 
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Purchases
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
