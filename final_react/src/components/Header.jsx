import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa'; 
import './Header.css';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  return (
    <header className="header">
      <div className="nav-left">
        <nav className="nav-links">
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
          <Link to="/reviews" className={location.pathname === '/reviews' ? 'active' : ''}>Reviews</Link>
        </nav>
      </div>

      <div className="nav-center">
        <span className="site-title">Beauty.bd</span>
      </div>

      <div className="cart-link">
        <Link to="/checkout">
          <FaShoppingCart size={24} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
