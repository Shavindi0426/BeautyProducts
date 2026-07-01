import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const allProducts = [
  { id: 1, icon: '🧴', name: 'Body Lotion', category: 'Body Care', desc: 'Deep moisturizing with ayurvedic herbs. Enriched with coconut oil and aloe vera for soft, glowing skin.', price: 850, ingredients: ['Coconut Oil', 'Aloe Vera', 'Turmeric'] },
  { id: 2, icon: '🫧', name: 'Face Wash', category: 'Face Care', desc: 'Gentle cleansing with natural extracts. Removes impurities without stripping natural oils.', price: 750, ingredients: ['Neem', 'Tulsi', 'Rose Water'] },
  { id: 3, icon: '✨', name: 'Face Cream', category: 'Face Care', desc: 'Nourishing cream for glowing skin. Deeply hydrates and brightens your complexion naturally.', price: 950, ingredients: ['Saffron', 'Sandalwood', 'Honey'] },
  { id: 4, icon: '💧', name: 'Serum', category: 'Face Care', desc: 'Concentrated ayurvedic healing serum. Targets dark spots, fine lines and uneven skin tone.', price: 1200, ingredients: ['Saffron', 'Gotukola', 'Iramusu'] },
  { id: 5, icon: '🌱', name: 'Aloe Vera Gel', category: 'Body Care', desc: 'Pure soothing aloe vera gel. Calms irritated skin, sunburns and acts as a light moisturizer.', price: 650, ingredients: ['Aloe Vera', 'Rose Water', 'Tulsi'] },
  { id: 6, icon: '💆', name: 'Hair Oil', category: 'Hair Care', desc: 'Traditional hair nourishment blend. Strengthens roots, reduces hair fall and adds shine.', price: 900, ingredients: ['Coconut Oil', 'Hibiscus', 'Kalanduru'] },
];

const categories = ['All', 'Face Care', 'Body Care', 'Hair Care'];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filtered = allProducts
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div style={styles.page}>

      {/* Page Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Our Products</h1>
        <p style={styles.headerSubtitle}>
          Pure ayurvedic beauty products made with natural ingredients
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div style={styles.toolbar}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={styles.sortSelect}
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="default">Sort by: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Category Filters */}
      <div style={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            style={activeCategory === cat ? styles.activeCatBtn : styles.catBtn}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={styles.resultCount}>
        Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
      </p>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div style={styles.noResults}>
          <span style={{ fontSize: '48px' }}>🌿</span>
          <p>No products found. Try a different search.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(p => (
            <div key={p.id} style={styles.card}>
              {/* Product Icon */}
              <div style={styles.cardIconWrapper}>
                <span style={styles.cardIcon}>{p.icon}</span>
                <span style={styles.categoryTag}>{p.category}</span>
              </div>

              {/* Product Info */}
              <div style={styles.cardBody}>
                <h3 style={styles.cardName}>{p.name}</h3>
                <p style={styles.cardDesc}>{p.desc}</p>

                {/* Ingredients */}
                <div style={styles.ingredientTags}>
                  {p.ingredients.map((ing, i) => (
                    <span key={i} style={styles.ingTag}>🌿 {ing}</span>
                  ))}
                </div>

                {/* Price & Button */}
                <div style={styles.cardFooter}>
                  <span style={styles.price}>LKR {p.price.toLocaleString()}</span>
                  <button style={styles.addToCartBtn}>
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div style={styles.bottomCta}>
        <p style={styles.bottomCtaText}>🌿 All products are handcrafted with pure ayurvedic ingredients</p>
        <Link to="/" style={styles.backBtn}>← Back to Home</Link>
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

  // Header
  header: {
    backgroundColor: '#2d6a4f',
    padding: '60px 8%',
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: '42px',
    fontWeight: '800',
    color: 'white',
    margin: '0 0 12px 0'
  },
  headerSubtitle: {
    fontSize: '16px',
    color: '#b7dfc9',
    margin: 0
  },

  // Toolbar
  toolbar: {
    display: 'flex',
    gap: '16px',
    padding: '24px 8%',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  searchInput: {
    flex: 1,
    minWidth: '200px',
    padding: '12px 16px',
    border: '2px solid #e0f0e8',
    borderRadius: '30px',
    fontSize: '15px',
    outline: 'none',
    color: '#333'
  },
  sortSelect: {
    padding: '12px 16px',
    border: '2px solid #e0f0e8',
    borderRadius: '30px',
    fontSize: '14px',
    color: '#333',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none'
  },

  // Categories
  categories: {
    display: 'flex',
    gap: '12px',
    padding: '20px 8%',
    flexWrap: 'wrap'
  },
  catBtn: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #2d6a4f',
    backgroundColor: 'white',
    color: '#2d6a4f',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer'
  },
  activeCatBtn: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #2d6a4f',
    backgroundColor: '#2d6a4f',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer'
  },

  // Results
  resultCount: {
    padding: '0 8%',
    color: '#888',
    fontSize: '14px',
    marginBottom: '8px'
  },

  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    padding: '0 8%'
  },

  // Card
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
    border: '1px solid #e8f5e9',
    transition: 'transform 0.2s'
  },
  cardIconWrapper: {
    backgroundColor: '#f0faf5',
    padding: '32px',
    textAlign: 'center',
    position: 'relative',
    borderBottom: '1px solid #e8f5e9'
  },
  cardIcon: { fontSize: '72px' },
  categoryTag: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: '#2d6a4f',
    color: 'white',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '10px'
  },
  cardBody: { padding: '20px' },
  cardName: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '0 0 8px 0'
  },
  cardDesc: {
    fontSize: '14px',
    color: '#777',
    lineHeight: '1.6',
    margin: '0 0 16px 0'
  },

  // Ingredient tags
  ingredientTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '20px'
  },
  ingTag: {
    backgroundColor: '#e8f5e9',
    color: '#2d6a4f',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '10px'
  },

  // Card footer
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '16px'
  },
  price: {
    color: '#2d6a4f',
    fontWeight: '800',
    fontSize: '18px'
  },
  addToCartBtn: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer'
  },

  // No results
  noResults: {
    textAlign: 'center',
    padding: '60px',
    color: '#888'
  },

  // Bottom
  bottomCta: {
    textAlign: 'center',
    padding: '40px 8% 0'
  },
  bottomCtaText: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '16px'
  },
  backBtn: {
    color: '#2d6a4f',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px'
  }
};

export default Products;