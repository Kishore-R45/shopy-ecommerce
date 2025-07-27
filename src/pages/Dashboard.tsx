import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';
import OrdersPage from './OrdersPage';
import TransactionsPage from './TransactionsPage';
import ProfilePage from './ProfilePage';
import VendorProductsPage from './vendor/VendorProductsPage';
import ShopPage from './ShopPage';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/vendor/products" element={<VendorProductsPage />} />
          <Route path="/shop/:shopId" element={<ShopPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;