import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const products = [
  { id: '1', icon: '🧴', name: 'Body Lotion', category: 'Body Care', desc: 'Deep moisturizing with ayurvedic herbs. Enriched with coconut oil and aloe vera for soft, glowing skin.', price: 850, ingredients: ['Coconut Oil', 'Aloe Vera', 'Turmeric'] },
  { id: '2', icon: '🫧', name: 'Face Wash', category: 'Face Care', desc: 'Gentle cleansing with natural extracts. Removes impurities without stripping natural oils.', price: 750, ingredients: ['Neem', 'Tulsi', 'Rose Water'] },
  { id: '3', icon: '✨', name: 'Face Cream', category: 'Face Care', desc: 'Nourishing cream for glowing skin. Deeply hydrates and brightens your complexion naturally.', price: 950, ingredients: ['Saffron', 'Sandalwood', 'Honey'] },
  { id: '4', icon: '💧', name: 'Serum', category: 'Face Care', desc: 'Concentrated ayurvedic healing serum. Targets dark spots, fine lines and uneven skin tone.', price: 1200, ingredients: ['Saffron', 'Gotukola', 'Iramusu'] },
  { id: '5', icon: '🌱', name: 'Aloe Vera Gel', category: 'Body Care', desc: 'Pure soothing aloe vera gel. Calms irritated skin, sunburns and acts as a light moisturizer.', price: 650, ingredients: ['Aloe Vera', 'Rose Water', 'Tulsi'] },
  { id: '6', icon: '💆', name: 'Hair Oil', category: 'Hair Care', desc: 'Traditional hair nourishment blend. Strengthens roots, reduces hair fall and adds shine.', price: 900, ingredients: ['Coconut Oil', 'Hibiscus', 'Kalanduru'] },
];

const benefits = [
  { icon: '🌿', title: '100% Natural', desc: 'All ingredients sourced from nature' },
  { icon: '🧪', title: 'Ayurvedic Formula', desc: 'Ancient wisdom meets modern science' },
  { icon: '💚', title: 'Cruelty Free', desc: 'Never tested on animals' },
  { icon: '🌍', title: 'Eco Friendly', desc: 'Sustainable and ethical packaging' }
];

const plants = [
  { emoji: '🌿', name: 'Tulsi', benefit: 'Purifies & heals', top: '10%', left: '5%', size: '56px', delay: '0s' },
  { emoji: '🌺', name: 'Hibiscus', benefit: 'Hair growth', top: '20%', right: '4%', size: '52px', delay: '0.4s' },
  { emoji: '🍃', name: 'Neem', benefit: 'Antibacterial', top: '65%', left: '3%', size: '48px', delay: '0.8s' },
  { emoji: '🌸', name: 'Rose', benefit: 'Skin glow', top: '70%', right: '5%', size: '52px', delay: '0.2s' },
  { emoji: '🌼', name: 'Turmeric', benefit: 'Anti-aging', top: '85%', left: '8%', size: '44px', delay: '1s' },
  { emoji: '🪴', name: 'Aloe Vera', benefit: 'Deep hydration', top: '5%', right: '12%', size: '50px', delay: '0.6s' },
];

const ingredients = [
  { emoji: '🪵', name: 'Red Sandalwood', benefit: 'Skin brightening', desc: 'Cools and soothes skin, reduces dark spots and evens skin tone naturally' },
  { emoji: '🌿', name: 'Kohomba (Neem)', benefit: 'Antibacterial', desc: 'Powerful antibacterial herb used in Ayurveda for centuries to treat acne and skin infections' },
  { emoji: '🌸', name: 'Saffron', benefit: 'Skin glow', desc: 'Rare golden spice that brightens complexion, reduces pigmentation and gives a natural glow' },
  { emoji: '🌰', name: 'Kalanduru (Cinnamon)', benefit: 'Anti-inflammatory', desc: 'True Ceylon cinnamon with anti-inflammatory properties that stimulates blood circulation' },
  { emoji: '🌺', name: 'Hibiscus', benefit: 'Hair growth', desc: 'Promotes hair growth, prevents premature greying and adds natural shine and softness' },
  { emoji: '🪴', name: 'Aloe Vera', benefit: 'Deep hydration', desc: 'Deep hydration and cooling effect, perfect for soothing sunburns and sensitive skin' },
  { emoji: '🌼', name: 'Turmeric', benefit: 'Anti-aging', desc: 'Ancient golden spice with powerful antioxidants that fight aging and brighten skin' },
  { emoji: '🫚', name: 'Coconut Oil', benefit: 'Deep nourishment', desc: 'Pure Ceylon coconut oil deeply nourishes hair and skin, locking in moisture naturally' },
  { emoji: '🌱', name: 'Gotukola', benefit: 'Collagen boost', desc: 'Traditional Sri Lankan herb that boosts collagen production and heals skin naturally' },
  { emoji: '🍃', name: 'Ranawara', benefit: 'Skin healing', desc: 'Beautiful golden Sri Lankan flower known for its skin healing and brightening properties' },
  { emoji: '🌿', name: 'Iramusu', benefit: 'Blood purifying', desc: 'Powerful blood purifying herb that clears skin from within, treating eczema and rashes' },
  { emoji: '🫙', name: 'Bee Honey', benefit: 'Moisturizing', desc: 'Pure natural honey with antibacterial properties that moisturizes and heals damaged skin' },
];

const Home = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [added, setAdded] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setAdded(false);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setAdded(false);
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const result = await addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      icon: selectedProduct.icon,
      category: selectedProduct.category
    });
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div style={styles.page}>

      {/* ── Hero ── */}
      <section style={styles.hero}>
        {plants.map((plant, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: plant.top,
            left: plant.left || 'auto',
            right: plant.right || 'auto',
            textAlign: 'center',
            animation: 'float 3s ease-in-out infinite',
            animationDelay: plant.delay,
            zIndex: 1
          }}>
            <div style={{ fontSize: plant.size }}>{plant.emoji}</div>
            <div style={styles.plantLabel}>
              <strong style={{ color: '#2d6a4f', fontSize: '11px' }}>{plant.name}</strong><br />
              <span style={{ color: '#888', fontSize: '10px' }}>{plant.benefit}</span>
            </div>
          </div>
        ))}

        <div style={styles.heroContent}>
          <span style={styles.badge}>🌿 Pure Ayurvedic Beauty</span>
          <h1 style={styles.heroTitle}>
            Discover the Power of<br />
            <span style={styles.heroHighlight}>Nature's Beauty</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Handcrafted ayurvedic beauty products made with pure natural
            ingredients for radiant, healthy skin and hair.
          </p>
          <div style={styles.statsRow}>
            <div style={styles.stat}><strong style={styles.statNum}>100%</strong><span style={styles.statLabel}>Natural</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><strong style={styles.statNum}>6+</strong><span style={styles.statLabel}>Products</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><strong style={styles.statNum}>0</strong><span style={styles.statLabel}>Chemicals</span></div>
          </div>
          <div style={styles.heroButtons}>
            <Link to="/products" style={styles.primaryBtn}>Shop Now →</Link>
            {!user && <Link to="/register" style={styles.secondaryBtn}>Create Account</Link>}
          </div>
        </div>

        <div style={styles.heroVisual}>
          <div style={styles.outerRing}>
            <div style={styles.middleRing}>
              <div style={styles.innerCircle}>
                <span style={{ fontSize: '100px' }}>🌸</span>
              </div>
            </div>
          </div>
          <div style={{ ...styles.orbitBadge, top: '-10px', left: '50%', transform: 'translateX(-50%)' }}>🌿 Tulsi</div>
          <div style={{ ...styles.orbitBadge, top: '50%', right: '-20px', transform: 'translateY(-50%)' }}>🌺 Hibiscus</div>
          <div style={{ ...styles.orbitBadge, bottom: '-10px', left: '50%', transform: 'translateX(-50%)' }}>🍯 Honey</div>
          <div style={{ ...styles.orbitBadge, top: '50%', left: '-20px', transform: 'translateY(-50%)' }}>🌼 Turmeric</div>
          <div style={styles.floatBadge1}>✨ Natural</div>
          <div style={styles.floatBadge2}>💚 Pure</div>
        </div>
      </section>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.04);opacity:.85} }
        @keyframes fadeIn { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* ── Ingredients Strip ── */}
      <section style={styles.strip}>
        {['🪵 Red Sandalwood','🌿 Kohomba','🌸 Saffron','🌰 Kalanduru','🌺 Hibiscus',
          '🪴 Aloe Vera','🌼 Turmeric','🌱 Gotukola','🍃 Ranawara','🌿 Iramusu',
          '🫚 Coconut Oil','🫙 Bee Honey'].map((item, i) => (
          <span key={i} style={styles.stripItem}>{item}</span>
        ))}
      </section>

      {/* ── Benefits ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Orica?</h2>
        <p style={styles.sectionSubtitle}>We believe beauty should be pure, natural and kind to your skin</p>
        <div style={styles.benefitsGrid}>
          {benefits.map((b, i) => (
            <div key={i} style={styles.benefitCard}>
              <span style={styles.benefitIcon}>{b.icon}</span>
              <h3 style={styles.benefitTitle}>{b.title}</h3>
              <p style={styles.benefitDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Products Preview ── */}
      <section style={{ ...styles.section, backgroundColor: '#f0faf5' }}>
        <h2 style={styles.sectionTitle}>Our Products</h2>
        <p style={styles.sectionSubtitle}>
          {user ? 'Click any product to view details and add to cart'
                 : 'Click any product to explore — login to see pricing & shop'}
        </p>
        <div style={styles.productsGrid}>
          {products.map(p => (
            <div
              key={p.id}
              style={styles.productCard}
              onClick={() => handleProductClick(p)}
            >
              <div style={styles.productIconWrapper}>
                <span style={{ fontSize: '64px' }}>{p.icon}</span>
                <span style={styles.categoryTag}>{p.category}</span>
                {!user && (
                  <div style={styles.lockOverlay}>
                    <span style={{ fontSize: '20px' }}>🔒</span>
                    <span style={{ fontSize: '11px', marginTop: '4px' }}>Login to see price</span>
                  </div>
                )}
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{p.name}</h3>
                <p style={styles.productDescShort}>{p.desc.split('.')[0]}.</p>
                <div style={styles.productFooter}>
                  {user ? (
                    <span style={styles.productPrice}>LKR {p.price.toLocaleString()}</span>
                  ) : (
                    <span style={styles.blurredPrice}>LKR ●●●●</span>
                  )}
                  <span style={styles.viewBtn}>View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/products" style={styles.primaryBtn}>Browse All Products →</Link>
        </div>
      </section>

      {/* ── Ingredients Section ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Key Ayurvedic Ingredients</h2>
        <p style={styles.sectionSubtitle}>Ancient plants and herbs with powerful beauty benefits</p>
        <div style={styles.ingredientsGrid}>
          {ingredients.map((ing, i) => (
            <div key={i} style={styles.ingredientCard}>
              <div style={{ fontSize: '44px', marginBottom: '10px' }}>{ing.emoji}</div>
              <div style={styles.ingredientBadge}>{ing.benefit}</div>
              <h4 style={styles.ingredientName}>{ing.name}</h4>
              <p style={styles.ingredientDesc}>{ing.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      {!user && (
        <section style={styles.ctaSection}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🌿 🌸 🌿</div>
          <h2 style={styles.ctaTitle}>Ready to Start Your Natural Beauty Journey?</h2>
          <p style={styles.ctaSubtitle}>Create a free account to unlock prices, add to cart and order</p>
          <div style={styles.ctaButtons}>
            <Link to="/register" style={styles.ctaPrimaryBtn}>Create Free Account →</Link>
            <Link to="/login" style={styles.ctaSecondaryBtn}>Already a member? Login</Link>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <div style={{ fontSize: '24px', marginBottom: '12px', letterSpacing: '8px' }}>🌿 🌺 🌸 🌼 🪴 🌱</div>
        <p style={styles.footerText}>🌿 Orica — Pure Ayurvedic Beauty © 2024</p>
        <p style={styles.footerSub}>Made with 💚 using natural ingredients</p>
      </footer>

      {/* ── Product Modal ── */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>

            {/* Close button */}
            <button style={styles.closeBtn} onClick={closeModal}>✕</button>

            {/* Product icon */}
            <div style={styles.modalIconArea}>
              <span style={{ fontSize: '80px' }}>{selectedProduct.icon}</span>
              <span style={styles.modalCategoryTag}>{selectedProduct.category}</span>
            </div>

            {/* Product info */}
            <div style={styles.modalBody}>
              <h2 style={styles.modalName}>{selectedProduct.name}</h2>
              <p style={styles.modalDesc}>{selectedProduct.desc}</p>

              {/* Ingredients */}
              <div style={{ marginBottom: '20px' }}>
                <p style={styles.modalLabel}>Key Ingredients</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedProduct.ingredients.map((ing, i) => (
                    <span key={i} style={styles.modalIngTag}>🌿 {ing}</span>
                  ))}
                </div>
              </div>

              {/* Price & action */}
              {user ? (
                <>
                  <div style={styles.modalPriceRow}>
                    <div>
                      <p style={styles.modalLabel}>Price</p>
                      <p style={styles.modalPrice}>LKR {selectedProduct.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p style={styles.modalLabel}>Availability</p>
                      <p style={{ color: '#2d6a4f', fontWeight: '700' }}>✅ In Stock</p>
                    </div>
                  </div>
                  <button
                    style={added ? styles.addedBtn : styles.modalCartBtn}
                    onClick={handleAddToCart}
                    disabled={added}
                  >
                    {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
                  </button>
                  <Link to="/products" style={styles.modalViewAll} onClick={closeModal}>
                    View All Products →
                  </Link>
                </>
              ) : (
                <div style={styles.loginPrompt}>
                  <div style={styles.blurredPriceBox}>
                    <p style={styles.modalLabel}>Price</p>
                    <p style={styles.bigBlurredPrice}>LKR ●●●●</p>
                    <p style={styles.loginPromptText}>
                      🔒 Login to unlock the price and add to cart
                    </p>
                  </div>
                  <Link to="/login" style={styles.modalLoginBtn} onClick={closeModal}>
                    Login to Shop →
                  </Link>
                  <Link to="/register" style={styles.modalRegisterBtn} onClick={closeModal}>
                    Create Free Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", color: '#333', overflowX: 'hidden' },

  // Hero
  hero: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '80px 8%', backgroundColor: '#fafffe',
    minHeight: '90vh', position: 'relative', overflow: 'hidden'
  },
  heroContent: { flex: 1, maxWidth: '520px', position: 'relative', zIndex: 2 },
  badge: { backgroundColor: '#e8f5e9', color: '#2d6a4f', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' },
  heroTitle: { fontSize: '52px', fontWeight: '800', lineHeight: '1.15', margin: '20px 0 16px', color: '#1a1a2e' },
  heroHighlight: { color: '#2d6a4f' },
  heroSubtitle: { fontSize: '17px', color: '#666', lineHeight: '1.7', marginBottom: '24px' },
  statsRow: { display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px', padding: '16px 20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', width: 'fit-content' },
  stat: { textAlign: 'center' },
  statNum: { display: 'block', fontSize: '22px', color: '#2d6a4f', fontWeight: '800' },
  statLabel: { fontSize: '12px', color: '#888' },
  statDivider: { width: '1px', height: '36px', backgroundColor: '#eee' },
  heroButtons: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  primaryBtn: { backgroundColor: '#2d6a4f', color: 'white', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontSize: '15px', fontWeight: '600', display: 'inline-block' },
  secondaryBtn: { backgroundColor: 'transparent', color: '#2d6a4f', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontSize: '15px', fontWeight: '600', border: '2px solid #2d6a4f', display: 'inline-block' },

  // Hero visual
  heroVisual: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '460px', zIndex: 2 },
  outerRing: { width: '360px', height: '360px', borderRadius: '50%', border: '2px dashed #b7dfc9', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse-ring 4s ease-in-out infinite' },
  middleRing: { width: '290px', height: '290px', borderRadius: '50%', border: '2px solid #d4edda', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0faf5' },
  innerCircle: { width: '210px', height: '210px', borderRadius: '50%', backgroundColor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #b7dfc9' },
  orbitBadge: { position: 'absolute', backgroundColor: 'white', padding: '6px 14px', borderRadius: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.1)', fontWeight: '600', fontSize: '13px', color: '#2d6a4f', whiteSpace: 'nowrap' },
  floatBadge1: { position: 'absolute', top: '20px', right: '20px', backgroundColor: '#2d6a4f', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: '600', fontSize: '13px' },
  floatBadge2: { position: 'absolute', bottom: '30px', right: '10px', backgroundColor: 'white', color: '#2d6a4f', padding: '8px 16px', borderRadius: '20px', fontWeight: '600', fontSize: '13px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  plantLabel: { backgroundColor: 'white', borderRadius: '8px', padding: '4px 8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginTop: '4px', whiteSpace: 'nowrap' },

  // Strip
  strip: { backgroundColor: '#2d6a4f', padding: '14px 0', display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' },
  stripItem: { color: 'white', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' },

  // Sections
  section: { padding: '80px 8%', textAlign: 'center' },
  sectionTitle: { fontSize: '36px', fontWeight: '700', color: '#1a1a2e', marginBottom: '12px' },
  sectionSubtitle: { fontSize: '16px', color: '#888', marginBottom: '48px' },

  // Benefits
  benefitsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' },
  benefitCard: { padding: '32px 24px', backgroundColor: '#f9f9f9', borderRadius: '16px', textAlign: 'center', border: '1px solid #eee' },
  benefitIcon: { fontSize: '40px', display: 'block', marginBottom: '12px' },
  benefitTitle: { fontSize: '18px', fontWeight: '700', color: '#2d6a4f', marginBottom: '8px' },
  benefitDesc: { fontSize: '14px', color: '#777', lineHeight: '1.6' },

  // Products grid
  productsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '16px' },
  productCard: {
    backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid #e8f5e9',
    cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
    textAlign: 'left'
  },
  productIconWrapper: { backgroundColor: '#f0faf5', padding: '32px', textAlign: 'center', position: 'relative', borderBottom: '1px solid #e8f5e9' },
  categoryTag: { position: 'absolute', top: '12px', right: '12px', backgroundColor: '#2d6a4f', color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '10px' },
  lockOverlay: { position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(45,106,79,0.9)', color: 'white', padding: '4px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' },
  productInfo: { padding: '18px' },
  productName: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 6px 0' },
  productDescShort: { fontSize: '13px', color: '#777', lineHeight: '1.5', margin: '0 0 14px 0' },
  productFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '12px' },
  productPrice: { color: '#2d6a4f', fontWeight: '800', fontSize: '16px' },
  blurredPrice: { color: '#aaa', fontWeight: '700', fontSize: '15px', filter: 'blur(4px)', userSelect: 'none' },
  viewBtn: { color: '#2d6a4f', fontWeight: '600', fontSize: '13px' },

  // Ingredients
  ingredientsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' },
  ingredientCard: { backgroundColor: '#f0faf5', borderRadius: '16px', padding: '24px 20px', textAlign: 'center', border: '1px solid #d4edda' },
  ingredientBadge: { display: 'inline-block', backgroundColor: '#2d6a4f', color: 'white', fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '10px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  ingredientName: { fontSize: '15px', fontWeight: '700', color: '#2d6a4f', margin: '0 0 8px 0' },
  ingredientDesc: { fontSize: '12px', color: '#666', lineHeight: '1.6', margin: 0 },

  // CTA
  ctaSection: { backgroundColor: '#2d6a4f', padding: '80px 8%', textAlign: 'center' },
  ctaTitle: { fontSize: '36px', fontWeight: '700', color: 'white', marginBottom: '12px' },
  ctaSubtitle: { fontSize: '16px', color: '#b7dfc9', marginBottom: '36px' },
  ctaButtons: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  ctaPrimaryBtn: { backgroundColor: 'white', color: '#2d6a4f', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontSize: '15px', fontWeight: '700', display: 'inline-block' },
  ctaSecondaryBtn: { backgroundColor: 'transparent', color: 'white', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontSize: '15px', fontWeight: '600', border: '2px solid white', display: 'inline-block' },

  // Footer
  footer: { backgroundColor: '#1a1a2e', padding: '40px', textAlign: 'center' },
  footerText: { color: '#aaa', fontSize: '15px', marginBottom: '4px' },
  footerSub: { color: '#666', fontSize: '13px' },

  // Modal
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '20px'
  },
  modalBox: {
    backgroundColor: 'white', borderRadius: '20px',
    width: '100%', maxWidth: '480px',
    maxHeight: '90vh', overflowY: 'auto',
    position: 'relative',
    animation: 'fadeIn 0.25s ease'
  },
  closeBtn: {
    position: 'absolute', top: '16px', right: '16px',
    backgroundColor: '#f0f0f0', border: 'none',
    borderRadius: '50%', width: '32px', height: '32px',
    fontSize: '14px', cursor: 'pointer', fontWeight: '700',
    zIndex: 10
  },
  modalIconArea: {
    backgroundColor: '#f0faf5', padding: '40px',
    textAlign: 'center', borderRadius: '20px 20px 0 0',
    position: 'relative', borderBottom: '1px solid #e8f5e9'
  },
  modalCategoryTag: { position: 'absolute', top: '16px', left: '16px', backgroundColor: '#2d6a4f', color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '10px' },
  modalBody: { padding: '24px' },
  modalName: { fontSize: '24px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 10px 0' },
  modalDesc: { fontSize: '14px', color: '#666', lineHeight: '1.7', margin: '0 0 20px 0' },
  modalLabel: { fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px 0' },
  modalIngTag: { backgroundColor: '#e8f5e9', color: '#2d6a4f', fontSize: '12px', fontWeight: '600', padding: '5px 12px', borderRadius: '10px' },
  modalPriceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#f0faf5', borderRadius: '12px', padding: '16px', marginBottom: '20px' },
  modalPrice: { fontSize: '26px', fontWeight: '800', color: '#2d6a4f', margin: 0 },
  modalCartBtn: { width: '100%', padding: '14px', backgroundColor: '#2d6a4f', color: 'white', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px' },
  addedBtn: { width: '100%', padding: '14px', backgroundColor: '#52b788', color: 'white', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: '700', cursor: 'not-allowed', marginBottom: '12px' },
  modalViewAll: { display: 'block', textAlign: 'center', color: '#2d6a4f', textDecoration: 'none', fontWeight: '600', fontSize: '14px' },

  // Login prompt inside modal
  loginPrompt: { textAlign: 'center' },
  blurredPriceBox: { backgroundColor: '#f0faf5', borderRadius: '12px', padding: '20px', marginBottom: '20px' },
  bigBlurredPrice: { fontSize: '28px', fontWeight: '800', color: '#aaa', filter: 'blur(5px)', userSelect: 'none', margin: '4px 0 12px 0' },
  loginPromptText: { fontSize: '14px', color: '#555', fontWeight: '500', margin: 0 },
  modalLoginBtn: { display: 'block', backgroundColor: '#2d6a4f', color: 'white', padding: '14px', borderRadius: '30px', textDecoration: 'none', fontWeight: '700', fontSize: '15px', marginBottom: '12px' },
  modalRegisterBtn: { display: 'block', backgroundColor: 'transparent', color: '#2d6a4f', padding: '12px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', border: '2px solid #2d6a4f' }
};

export default Home;