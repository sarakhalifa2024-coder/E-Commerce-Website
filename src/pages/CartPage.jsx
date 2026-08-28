import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Your cart is empty 🛒</h2>
        <p>Add some products to your cart!</p>
        <Link to="/products">
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            Browse Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Your Cart</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
      }}>
        {/* Cart Items */}
        <div>
          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              borderBottom: '1px solid #ddd',
              alignItems: 'center'
            }}>
              <img src={item.image} alt={item.name} style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '4px'
              }} />
              
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>${item.price}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#ecf0f1',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#ecf0f1',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ minWidth: '80px', textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <h2>Order Summary</h2>
          <div style={{ margin: '1rem 0' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0.5rem 0'
              }}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{
            borderTop: '2px solid #ddd',
            paddingTop: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#229954'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;