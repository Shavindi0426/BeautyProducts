import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

  // Fetch cart when user logs in
  useEffect(() => {
    if (user && token) fetchCart();
    else setCart({ items: [], totalPrice: 0 });
  }, [user, token]);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
    } catch (error) {
      console.log('Cart fetch error:', error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) return { success: false, message: 'Please login to add items to cart' };
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/cart/add',
        { product, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cart);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to add to cart' };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/update/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cart);
    } catch (error) {
      console.log('Update error:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cart);
    } catch (error) {
      console.log('Remove error:', error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete(
        'http://localhost:5000/api/cart/clear',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cart);
    } catch (error) {
      console.log('Clear error:', error);
    }
  };

  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, loading, cartCount,
      addToCart, updateQuantity, removeFromCart, clearCart, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);