import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logoLink}>
        <span style={styles.logoText}>🌿 Orica</span>
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>

        {user ? (
          <>
            <span style={styles.welcome}>Hi, {user.name}! 🌿</span>
            {user.role === 'admin' && (
              <Link to="/admin" style={styles.link}>Admin</Link>
            )}
            {/* Cart Icon */}
            <Link to="/cart" style={styles.cartIcon}>
              🛒
              {cartCount > 0 && (
                <span style={styles.cartBadge}>{cartCount}</span>
              )}
            </Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/cart" style={styles.cartIcon}>
              🛒
              {cartCount > 0 && (
                <span style={styles.cartBadge}>{cartCount}</span>
              )}
            </Link>
            <Link to="/register" style={styles.registerBtn}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 48px',
    backgroundColor: 'white',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logoLink: { textDecoration: 'none' },
  logoText: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#2d6a4f',
    letterSpacing: '1px'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  link: {
    color: '#2d6a4f',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '600'
  },
  welcome: {
    color: '#2d6a4f',
    fontWeight: '600',
    fontSize: '15px'
  },
  cartIcon: {
    position: 'relative',
    fontSize: '22px',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-10px',
    backgroundColor: '#e63946',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerBtn: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    padding: '10px 22px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600'
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: '2px solid #2d6a4f',
    color: '#2d6a4f',
    padding: '8px 18px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  }
};

export default Navbar;