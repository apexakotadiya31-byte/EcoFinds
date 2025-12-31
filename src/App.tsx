import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Feed } from './pages/Feed';
import { ProductDetail } from './pages/ProductDetail';
import { AddProduct } from './pages/AddProduct';
import { MyListings } from './pages/MyListings';
import { Dashboard } from './pages/Dashboard';
import { Cart } from './pages/Cart';
import { Purchases } from './pages/Purchases';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                
                {/* Protected Routes */}
                <Route path="/add-product" element={
                  <ProtectedRoute>
                    <AddProduct />
                  </ProtectedRoute>
                } />
                <Route path="/edit-product/:id" element={
                  <ProtectedRoute>
                    <AddProduct />
                  </ProtectedRoute>
                } />
                <Route path="/my-listings" element={
                  <ProtectedRoute>
                    <MyListings />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={<Cart />} />
                <Route path="/purchases" element={
                  <ProtectedRoute>
                    <Purchases />
                  </ProtectedRoute>
                } />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
