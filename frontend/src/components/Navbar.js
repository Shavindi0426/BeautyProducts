import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🌿 Orica</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        {user ? (
          <>
            <span style={styles.welcome}>Hi, {user.name}!</span>
            {user.role === 'admin' && (
              <Link to="/admin" style={styles.link}>Admin</Link>
            )}
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
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
    padding: '16px 48px',
    backgroundColor: 'white',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2d6a4f',
    textDecoration: 'none',
    letterSpacing: '1px'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  link: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  welcome: {
    color: '#2d6a4f',
    fontWeight: '600',
    fontSize: '15px'
  },
  registerBtn: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600'
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: '2px solid #2d6a4f',
    color: '#2d6a4f',
    padding: '6px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  }
};

export default Navbar;