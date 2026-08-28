import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Navbar() {
  const { getCartCount } = useCart();

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          🛍️ Online Store
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
            🛒 Cart
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                backgroundColor: '#e74c3c',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;