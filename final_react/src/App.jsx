import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ReviewsPage from './pages/ReviewsPage';
import CheckoutPage from './pages/CheckoutPage';
import Toast from './components/Toast';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Toast />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
