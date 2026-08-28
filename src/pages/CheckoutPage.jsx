import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    shippingAddress: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const { clearCart, getCartTotal, cartItems } = useCart();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.shippingAddress.trim()) newErrors.shippingAddress = 'Shipping address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setOrderPlaced(true);
      clearCart();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  if (orderPlaced) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '4rem auto',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '8px',
        color: '#155724'
      }}>
        <h2>✅ Order Placed Successfully!</h2>
        <p>Thank you for your purchase, {formData.fullName}!</p>
        <p>Your order confirmation has been sent to {formData.email}</p>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Your cart is empty</h2>
        <p>Add items to your cart before checking out.</p>
        <button
          onClick={() => navigate('/products')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        {/* Order Summary */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          height: 'fit-content'
        }}>
          <h3>Order Summary</h3>
          <div style={{ margin: '1rem 0' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0.5rem 0',
                fontSize: '0.9rem'
              }}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{
            borderTop: '1px solid #ddd',
            paddingTop: '1rem',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: `1px solid ${errors.fullName ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            {errors.fullName && (
              <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {errors.fullName}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: `1px solid ${errors.email ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
            {errors.email && (
              <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Shipping Address *
            </label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              rows="3"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: `1px solid ${errors.shippingAddress ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
            {errors.shippingAddress && (
              <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {errors.shippingAddress}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#229954'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;