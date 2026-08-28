import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../contexts/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = productsData.products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Product not found!</h2>
        <button onClick={() => navigate('/products')} style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '2rem'
      }}>
        ← Back
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem'
      }}>
        <div>
          <img src={product.image} alt={product.name} style={{
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }} />
        </div>

        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
          <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>Category: {product.category}</p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {product.description}
          </p>
          <p style={{ fontSize: '2.5rem', color: '#e74c3c', fontWeight: 'bold', marginBottom: '2rem' }}>
            ${product.price}
          </p>
          <button
            onClick={() => {
              addToCart(product);
              alert(`${product.name} added to cart!`);
            }}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;