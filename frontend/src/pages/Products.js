import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import aloeVera from '../assets/products/aloe-vera-gel.jpg.jpeg';
import bodyLotionSaffron from '../assets/products/body-lotion-saffron.jpg.jpeg';
import bodyLotionSandalwood from '../assets/products/body-lotion-sandalwood.jpg.jpeg';
import faceWashSandalwood from '../assets/products/face-wash-sandalwood.jpg.jpeg';
import faceWashKalanduru from '../assets/products/face-wash-kalanduru.jpg.jpeg';
import faceWashGold from '../assets/products/face-wash-gold.jpg.jpeg';
import hairOil from '../assets/products/hair-oil.jpg.jpeg';
import nightCream from '../assets/products/night-cream.jpg.jpeg';

const allProducts = [
  { id: '1', image: aloeVera, name: 'Aloe Vera Gel', category: 'Body Care', desc: 'Enriched with pure Aloe Vera and Ayurvedic ingredients to refresh, soothe and nourish your skin naturally. Suitable for all skin types.', price: 750, volume: '100ml', ingredients: ['Aloe Vera', 'Ayurvedic Herbs', 'Natural Extracts'] },
  { id: '2', image: bodyLotionSaffron, name: 'Ayurvedic Saffron Body Lotion', category: 'Body Care', desc: 'A luxurious body lotion enriched with pure Saffron. Deeply moisturizes, nourishes and brightens skin with no mineral oil.', price: 2000, volume: '200ml', ingredients: ['Saffron', 'Ayurvedic Herbs', 'Natural Oils'] },
  { id: '3', image: bodyLotionSandalwood, name: 'Sandalwood Body Lotion', category: 'Body Care', desc: 'A deeply nourishing body lotion with pure Sandalwood and Ayurvedic herbs. Leaves skin soft, smooth and beautifully scented.', price: 1800, volume: '200ml', ingredients: ['Sandalwood', 'Coconut Oil', 'Ayurvedic Herbs'] },
  { id: '4', image: faceWashSandalwood, name: 'Red Sandalwood Face Wash', category: 'Face Care', desc: 'A gentle blend enriched with Red Sandalwood, Kohomba and Venivelgata that cleanses, purifies and refreshes your skin naturally.', price: 600, volume: '100ml', ingredients: ['Red Sandalwood', 'Kohomba', 'Venivelgata'] },
  { id: '5', image: faceWashKalanduru, name: 'Kalanduru Face Wash', category: 'Face Care', desc: 'Powered by Kalanduru, Kohomba and Rosehip Oil. Purifies skin, reduces acne and adds a natural healthy glow.', price: 600, volume: '100ml', ingredients: ['Kalanduru', 'Kohomba', 'Rosehip Oil'] },
  { id: '6', image: faceWashGold, name: 'Gold Face Wash', category: 'Face Care', desc: 'A gentle blend of Aloe Vera, Rosehip Oil and Ayurvedic ingredients for healthy, glowing skin every day.', price: 600, volume: '100ml', ingredients: ['Aloe Vera', 'Rosehip Oil', 'Ayurvedic Herbs'] },
  { id: '7', image: hairOil, name: 'Ayurvedic Hair Oil', category: 'Hair Care', desc: 'Traditional ayurvedic hair oil that strengthens roots, reduces hair fall and adds natural shine. Made with pure Ceylon herbs.', price: 900, volume: '100ml', ingredients: ['Coconut Oil', 'Hibiscus', 'Kalanduru'] },
  { id: '8', image: nightCream, name: 'Ayurvedic Night Cream', category: 'Face Care', desc: 'A rich night cream infused with Ayurvedic herbs that restores, rejuvenates and deeply nourishes your skin overnight.', price: 1200, volume: '50ml', ingredients: ['Saffron', 'Sandalwood', 'Gotukola'] },
];

const categories = ['All', 'Face Care', 'Body Care', 'Hair Care'];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [addedItems, setAddedItems] = useState({});
  const [message, setMessage] = useState('');
  const { addToCart, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const filtered = allProducts
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });

  const handleAddToCart = async (product) => {
    if (!user) {
      setMessage('⚠️ Please login to add items to cart!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    const result = await addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: '🛍️',
      category: product.category
    });
    if (result.success) {
      setAddedItems(prev => ({ ...prev, [product.id]: true }));
      setMessage(`✅ ${product.name} added to cart!`);
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [product.id]: false }));
        setMessage('');
      }, 2000);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Our Products</h1>
        <p style={styles.headerSubtitle}>Pure ayurvedic beauty products made with natural ingredients</p>
      </div>

      {message && <div style={styles.toast}>{message}</div>}

      <div style={styles.toolbar}>
        <input style={styles.searchInput} type="text" placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={styles.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sort by: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div style={styles.categories}>
        {categories.map(cat => (
          <button key={cat} style={activeCategory === cat ? styles.activeCatBtn : styles.catBtn} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <p style={styles.resultCount}>
        Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
      </p>

      {filtered.length === 0 ? (
        <div style={styles.noResults}>
          <span style={{ fontSize: '48px' }}>🌿</span>
          <p>No products found. Try a different search.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(p => (
            <div key={p.id} style={styles.card}>
              <div style={styles.cardImageWrapper}>
                <img src={p.image} alt={p.name} style={styles.cardImage} />
                <span style={styles.categoryTag}>{p.category}</span>
                <span style={styles.volumeTag}>{p.volume}</span>
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.cardName}>{p.name}</h3>
                <p style={styles.cardDesc}>{p.desc}</p>
                <div style={styles.ingredientTags}>
                  {p.ingredients.map((ing, i) => (
                    <span key={i} style={styles.ingTag}>🌿 {ing}</span>
                  ))}
                </div>
                <div style={styles.cardFooter}>
                  <span style={styles.price}>LKR {p.price.toLocaleString()}</span>
                  <button
                    style={addedItems[p.id] ? styles.addedBtn : styles.addToCartBtn}
                    onClick={() => handleAddToCart(p)}
                    disabled={loading || addedItems[p.id]}
                  >
                    {addedItems[p.id] ? '✅ Added!' : '🛒 Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={styles.bottomCta}>
        <p style={styles.bottomCtaText}>🌿 All products are handcrafted with pure ayurvedic ingredients</p>
        <Link to="/" style={styles.backBtn}>← Back to Home</Link>
      </div>
    </div>
  );
};

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", minHeight: '100vh', backgroundColor: '#fafffe', paddingBottom: '60px' },
  header: { backgroundColor: '#2d6a4f', padding: '60px 8%', textAlign: 'center' },
  headerTitle: { fontSize: '42px', fontWeight: '800', color: 'white', margin: '0 0 12px 0' },
  headerSubtitle: { fontSize: '16px', color: '#b7dfc9', margin: 0 },
  toast: { position: 'fixed', top: '90px', right: '24px', backgroundColor: '#2d6a4f', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: '600', fontSize: '15px', zIndex: 999, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' },
  toolbar: { display: 'flex', gap: '16px', padding: '24px 8%', flexWrap: 'wrap', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  searchInput: { flex: 1, minWidth: '200px', padding: '12px 16px', border: '2px solid #e0f0e8', borderRadius: '30px', fontSize: '15px', outline: 'none', color: '#333' },
  sortSelect: { padding: '12px 16px', border: '2px solid #e0f0e8', borderRadius: '30px', fontSize: '14px', color: '#333', backgroundColor: 'white', cursor: 'pointer', outline: 'none' },
  categories: { display: 'flex', gap: '12px', padding: '20px 8%', flexWrap: 'wrap' },
  catBtn: { padding: '8px 20px', borderRadius: '20px', border: '2px solid #2d6a4f', backgroundColor: 'white', color: '#2d6a4f', fontWeight: '600', fontSize: '14px', cursor: 'pointer' },
  activeCatBtn: { padding: '8px 20px', borderRadius: '20px', border: '2px solid #2d6a4f', backgroundColor: '#2d6a4f', color: 'white', fontWeight: '600', fontSize: '14px', cursor: 'pointer' },
  resultCount: { padding: '0 8%', color: '#888', fontSize: '14px', marginBottom: '8px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', padding: '0 8%' },
  card: { backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid #e8f5e9' },
  cardImageWrapper: { position: 'relative', height: '240px', overflow: 'hidden', borderBottom: '1px solid #e8f5e9' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  categoryTag: { position: 'absolute', top: '12px', right: '12px', backgroundColor: '#2d6a4f', color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '10px' },
  volumeTag: { position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.9)', color: '#2d6a4f', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '10px' },
  cardBody: { padding: '20px' },
  cardName: { fontSize: '20px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 8px 0' },
  cardDesc: { fontSize: '14px', color: '#777', lineHeight: '1.6', margin: '0 0 16px 0' },
  ingredientTags: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' },
  ingTag: { backgroundColor: '#e8f5e9', color: '#2d6a4f', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '10px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '16px' },
  price: { color: '#2d6a4f', fontWeight: '800', fontSize: '18px' },
  addToCartBtn: { backgroundColor: '#2d6a4f', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '20px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' },
  addedBtn: { backgroundColor: '#52b788', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '20px', fontWeight: '600', fontSize: '13px', cursor: 'not-allowed' },
  noResults: { textAlign: 'center', padding: '60px', color: '#888' },
  bottomCta: { textAlign: 'center', padding: '40px 8% 0' },
  bottomCtaText: { color: '#888', fontSize: '14px', marginBottom: '16px' },
  backBtn: { color: '#2d6a4f', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }
};

export default Products;