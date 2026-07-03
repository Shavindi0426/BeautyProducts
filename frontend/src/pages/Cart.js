import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={styles.emptyPage}>
        <span style={styles.emptyIcon}>🔒</span>
        <h2 style={styles.emptyTitle}>Please Login First</h2>
        <p style={styles.emptyDesc}>You need to be logged in to view your cart</p>
        <Link to="/login" style={styles.shopBtn}>Login Now →</Link>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div style={styles.emptyPage}>
        <span style={styles.emptyIcon}>🛒</span>
        <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
        <p style={styles.emptyDesc}>Add some ayurvedic products to your cart!</p>
        <Link to="/products" style={styles.shopBtn}>Shop Now →</Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>🛒 Your Cart</h1>
        <p style={styles.headerSubtitle}>{cart.items.length} item{cart.items.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div style={styles.content}>
        {/* Cart Items */}
        <div style={styles.itemsSection}>
          {cart.items.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              {/* Icon */}
              <div style={styles.itemIcon}>
                <span style={{ fontSize: '48px' }}>{item.product.icon}</span>
              </div>

              {/* Info */}
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.product.name}</h3>
                <p style={styles.itemCategory}>{item.product.category}</p>
                <p style={styles.itemPrice}>LKR {item.product.price.toLocaleString()}</p>
              </div>

              {/* Quantity Controls */}
              <div style={styles.quantityControls}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >−</button>
                <span style={styles.qtyNum}>{item.quantity}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >+</button>
              </div>

              {/* Subtotal */}
              <div style={styles.itemSubtotal}>
                <p style={styles.subtotalLabel}>Subtotal</p>
                <p style={styles.subtotalPrice}>
                  LKR {(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* Remove */}
              <button
                style={styles.removeBtn}
                onClick={() => removeFromCart(item._id)}
              >✕</button>
            </div>
          ))}

          {/* Clear Cart */}
          <button style={styles.clearBtn} onClick={clearCart}>
            🗑️ Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>

          <div style={styles.summaryRow}>
            <span>Subtotal ({cart.items.length} items)</span>
            <span>LKR {cart.totalPrice.toLocaleString()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Delivery</span>
            <span style={{ color: '#2d6a4f', fontWeight: '600' }}>Free 🎉</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Ayurvedic Guarantee</span>
            <span style={{ color: '#2d6a4f' }}>✅ 100% Natural</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalPrice}>LKR {cart.totalPrice.toLocaleString()}</span>
          </div>

          <button
            style={styles.checkoutBtn}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout →
          </button>

          <Link to="/products" style={styles.continueBtn}>
            ← Continue Shopping
          </Link>

          <div style={styles.guarantees}>
            <p style={styles.guaranteeItem}>🌿 100% Natural Ingredients</p>
            <p style={styles.guaranteeItem}>🚚 Free Delivery Island Wide</p>
            <p style={styles.guaranteeItem}>↩️ Easy Returns within 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: '100vh',
    backgroundColor: '#fafffe',
    paddingBottom: '60px'
  },
  header: {
    backgroundColor: '#2d6a4f',
    padding: '40px 8%',
    textAlign: 'center'
  },
  headerTitle: { fontSize: '36px', fontWeight: '800', color: 'white', margin: '0 0 8px 0' },
  headerSubtitle: { color: '#b7dfc9', fontSize: '16px', margin: 0 },

  content: {
    display: 'flex',
    gap: '32px',
    padding: '40px 8%',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },

  // Items
  itemsSection: { flex: 2, minWidth: '300px' },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    border: '1px solid #e8f5e9',
    flexWrap: 'wrap'
  },
  itemIcon: {
    backgroundColor: '#f0faf5',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center'
  },
  itemInfo: { flex: 1, minWidth: '140px' },
  itemName: { fontSize: '16px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 4px 0' },
  itemCategory: { fontSize: '12px', color: '#888', margin: '0 0 4px 0' },
  itemPrice: { fontSize: '15px', color: '#2d6a4f', fontWeight: '700', margin: 0 },

  // Quantity
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#f0faf5',
    borderRadius: '20px',
    padding: '6px 12px'
  },
  qtyBtn: {
    width: '28px', height: '28px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#2d6a4f',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700'
  },
  qtyNum: { fontSize: '16px', fontWeight: '700', color: '#1a1a2e', minWidth: '20px', textAlign: 'center' },

  // Subtotal
  itemSubtotal: { textAlign: 'right', minWidth: '100px' },
  subtotalLabel: { fontSize: '12px', color: '#888', margin: '0 0 4px 0' },
  subtotalPrice: { fontSize: '16px', fontWeight: '800', color: '#2d6a4f', margin: 0 },

  removeBtn: {
    backgroundColor: '#ffe0e0',
    color: '#cc0000',
    border: 'none',
    borderRadius: '50%',
    width: '32px', height: '32px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700'
  },

  clearBtn: {
    backgroundColor: 'transparent',
    border: '2px solid #ffcccc',
    color: '#cc0000',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    marginTop: '8px'
  },

  // Summary
  summary: {
    flex: 1,
    minWidth: '280px',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    border: '1px solid #e8f5e9',
    position: 'sticky',
    top: '100px'
  },
  summaryTitle: { fontSize: '20px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 20px 0' },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#555'
  },
  divider: { height: '1px', backgroundColor: '#eee', margin: '16px 0' },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  totalLabel: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e' },
  totalPrice: { fontSize: '22px', fontWeight: '800', color: '#2d6a4f' },

  checkoutBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#2d6a4f',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginBottom: '12px'
  },
  continueBtn: {
    display: 'block',
    textAlign: 'center',
    color: '#2d6a4f',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '20px'
  },
  guarantees: { borderTop: '1px solid #eee', paddingTop: '16px' },
  guaranteeItem: { fontSize: '13px', color: '#666', margin: '6px 0' },

  // Empty
  emptyPage: {
    textAlign: 'center',
    padding: '100px 20px',
    fontFamily: "'Segoe UI', sans-serif"
  },
  emptyIcon: { fontSize: '80px', display: 'block', marginBottom: '16px' },
  emptyTitle: { fontSize: '28px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' },
  emptyDesc: { fontSize: '16px', color: '#888', marginBottom: '24px' },
  shopBtn: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '600',
    display: 'inline-block'
  }
};

export default Cart;