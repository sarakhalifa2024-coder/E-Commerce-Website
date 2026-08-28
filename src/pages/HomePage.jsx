import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../contexts/CartContext';

function HomePage() {
  const featuredProducts = productsData.products.filter(p => p.featured);
  const { addToCart } = useCart();

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to Online Store</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Your one-stop destination for the latest electronics, fashion, and books!
        </p>
      </div>

      {/* Featured Products Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
           Featured Products
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {featuredProducts.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }} />
              </Link>
              <div style={{ padding: '1rem' }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{product.name}</h3>
                </Link>
                <p style={{ color: '#e74c3c', fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                  ${product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;