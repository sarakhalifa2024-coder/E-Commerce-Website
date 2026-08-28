import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../contexts/CartContext';

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All', ...new Set(productsData.products.map(p => p.category))];

  const filteredProducts = productsData.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>All Products</h1>

      {/* Search and Filter Section */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>No products found 😢</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
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
                <p style={{ color: '#7f8c8d', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                  {product.category}
                </p>
                <p style={{ color: '#e74c3c', fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                  ${product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#229954'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;