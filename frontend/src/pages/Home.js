import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const products = [
  { icon: '🧴', name: 'Body Lotion', desc: 'Deep moisturizing with ayurvedic herbs', price: 'LKR 850' },
  { icon: '🫧', name: 'Face Wash', desc: 'Gentle cleansing with natural extracts', price: 'LKR 750' },
  { icon: '✨', name: 'Face Cream', desc: 'Nourishing cream for glowing skin', price: 'LKR 950' },
  { icon: '💧', name: 'Serum', desc: 'Concentrated ayurvedic healing serum', price: 'LKR 1200' },
  { icon: '🌱', name: 'Aloe Vera Gel', desc: 'Pure soothing aloe vera gel', price: 'LKR 650' },
  { icon: '💆', name: 'Hair Oil', desc: 'Traditional hair nourishment blend', price: 'LKR 900' }
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.page}>

      {/* Hero Section */}
      <section style={styles.hero}>

        {/* Floating plants */}
        {plants.map((plant, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: plant.top,
              left: plant.left || 'auto',
              right: plant.right || 'auto',
              textAlign: 'center',
              animation: `float 3s ease-in-out infinite`,
              animationDelay: plant.delay,
              zIndex: 1
            }}
          >
            <div style={{ fontSize: plant.size }}>{plant.emoji}</div>
            <div style={styles.plantLabel}>
              <strong style={{ color: '#2d6a4f', fontSize: '11px' }}>{plant.name}</strong>
              <br />
              <span style={{ color: '#888', fontSize: '10px' }}>{plant.benefit}</span>
            </div>
          </div>
        ))}

        {/* Hero Content */}
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
            <div style={styles.stat}>
              <strong style={styles.statNum}>100%</strong>
              <span style={styles.statLabel}>Natural</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <strong style={styles.statNum}>6+</strong>
              <span style={styles.statLabel}>Products</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <strong style={styles.statNum}>0</strong>
              <span style={styles.statLabel}>Chemicals</span>
            </div>
          </div>
          <div style={styles.heroButtons}>
            {user ? (
              <Link to="/products" style={styles.primaryBtn}>Shop Now →</Link>
            ) : (
              <>
                <Link to="/register" style={styles.primaryBtn}>Get Started →</Link>
                <Link to="/products" style={styles.secondaryBtn}>View Products</Link>
              </>
            )}
          </div>
        </div>

        {/* Hero Visual */}
        <div style={styles.heroVisual}>
          <div style={styles.outerRing}>
            <div style={styles.middleRing}>
              <div style={styles.innerCircle}>
                <span style={styles.heroEmoji}>🌸</span>
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

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.85; }
        }
      `}</style>

      {/* Ingredients Strip */}
      <section style={styles.strip}>
        {[
          '🪵 Red Sandalwood', '🌿 Kohomba', '🌸 Saffron', '🌰 Kalanduru',
          '🌺 Hibiscus', '🪴 Aloe Vera', '🌼 Turmeric', '🌱 Gotukola',
          '🍃 Ranawara', '🌿 Iramusu', '🫚 Coconut Oil', '🫙 Bee Honey'
        ].map((item, i) => (
          <span key={i} style={styles.stripItem}>{item}</span>
        ))}
      </section>

      {/* Benefits Section */}
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

      {/* Products Section */}
      <section style={{ ...styles.section, backgroundColor: '#f0faf5' }}>
        <h2 style={styles.sectionTitle}>Our Products</h2>
        <p style={styles.sectionSubtitle}>Explore our range of ayurvedic beauty essentials</p>
        <div style={styles.productsGrid}>
          {products.map((p, i) => (
            <div key={i} style={styles.productCard}>
              <div style={styles.productIconWrapper}>
                <span style={styles.productIcon}>{p.icon}</span>
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{p.name}</h3>
                <p style={styles.productDesc}>{p.desc}</p>
                <div style={styles.productFooter}>
                  <span style={styles.productPrice}>{p.price}</span>
                  <Link to="/products" style={styles.productBtn}>Shop Now →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.centerBtn}>
          <Link to="/products" style={styles.primaryBtn}>See All Products →</Link>
        </div>
      </section>

      {/* Ayurvedic Ingredients Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Key Ayurvedic Ingredients</h2>
        <p style={styles.sectionSubtitle}>Ancient plants and herbs with powerful beauty benefits</p>
        <div style={styles.ingredientsGrid}>
          {ingredients.map((ing, i) => (
            <div key={i} style={styles.ingredientCard}>
              <div style={styles.ingredientEmoji}>{ing.emoji}</div>
              <div style={styles.ingredientBadge}>{ing.benefit}</div>
              <h4 style={styles.ingredientName}>{ing.name}</h4>
              <p style={styles.ingredientDesc}>{ing.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section style={styles.ctaSection}>
          <div style={styles.ctaPlants}>
            <span style={{ fontSize: '48px' }}>🌿</span>
            <span style={{ fontSize: '56px', margin: '0 24px' }}>🌸</span>
            <span style={{ fontSize: '48px' }}>🌿</span>
          </div>
          <h2 style={styles.ctaTitle}>Ready to Start Your Natural Beauty Journey?</h2>
          <p style={styles.ctaSubtitle}>
            Join thousands of happy customers who trust Orica for their beauty needs
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/register" style={styles.ctaPrimaryBtn}>Create Free Account →</Link>
            <Link to="/login" style={styles.ctaSecondaryBtn}>Already a member? Login</Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerPlants}>🌿 🌺 🌸 🌼 🪴 🌱</div>
        <p style={styles.footerText}>🌿 Orica — Pure Ayurvedic Beauty © 2024</p>
        <p style={styles.footerSub}>Made with 💚 using natural ingredients</p>
      </footer>

    </div>
  );
};

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", color: '#333', overflowX: 'hidden' },

  // Hero
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '80px 8%',
    backgroundColor: '#fafffe',
    minHeight: '90vh',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: { flex: 1, maxWidth: '520px', position: 'relative', zIndex: 2 },
  badge: {
    backgroundColor: '#e8f5e9',
    color: '#2d6a4f',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: '800',
    lineHeight: '1.15',
    margin: '20px 0 16px',
    color: '#1a1a2e'
  },
  heroHighlight: { color: '#2d6a4f' },
  heroSubtitle: {
    fontSize: '17px',
    color: '#666',
    lineHeight: '1.7',
    marginBottom: '24px'
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '28px',
    padding: '16px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    width: 'fit-content'
  },
  stat: { textAlign: 'center' },
  statNum: { display: 'block', fontSize: '22px', color: '#2d6a4f', fontWeight: '800' },
  statLabel: { fontSize: '12px', color: '#888' },
  statDivider: { width: '1px', height: '36px', backgroundColor: '#eee' },
  heroButtons: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  primaryBtn: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '600',
    display: 'inline-block'
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#2d6a4f',
    padding: '14px 28px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '600',
    border: '2px solid #2d6a4f',
    display: 'inline-block'
  },

  // Hero Visual
  heroVisual: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '460px',
    zIndex: 2
  },
  outerRing: {
    width: '360px', height: '360px', borderRadius: '50%',
    border: '2px dashed #b7dfc9',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    animation: 'pulse-ring 4s ease-in-out infinite'
  },
  middleRing: {
    width: '290px', height: '290px', borderRadius: '50%',
    border: '2px solid #d4edda',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f0faf5'
  },
  innerCircle: {
    width: '210px', height: '210px', borderRadius: '50%',
    backgroundColor: '#e8f5e9',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '3px solid #b7dfc9'
  },
  heroEmoji: { fontSize: '100px' },
  orbitBadge: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    fontWeight: '600',
    fontSize: '13px',
    color: '#2d6a4f',
    whiteSpace: 'nowrap'
  },
  floatBadge1: {
    position: 'absolute', top: '20px', right: '20px',
    backgroundColor: '#2d6a4f', color: 'white',
    padding: '8px 16px', borderRadius: '20px',
    fontWeight: '600', fontSize: '13px',
    boxShadow: '0 4px 12px rgba(45,106,79,0.3)'
  },
  floatBadge2: {
    position: 'absolute', bottom: '30px', right: '10px',
    backgroundColor: 'white', color: '#2d6a4f',
    padding: '8px 16px', borderRadius: '20px',
    fontWeight: '600', fontSize: '13px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  plantLabel: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '4px 8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginTop: '4px',
    whiteSpace: 'nowrap'
  },

  // Strip
  strip: {
    backgroundColor: '#2d6a4f',
    padding: '14px 0',
    display: 'flex',
    gap: '32px',
    overflowX: 'auto',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  stripItem: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },

  // Sections
  section: { padding: '80px 8%', textAlign: 'center' },
  sectionTitle: { fontSize: '36px', fontWeight: '700', color: '#1a1a2e', marginBottom: '12px' },
  sectionSubtitle: { fontSize: '16px', color: '#888', marginBottom: '48px' },

  // Benefits
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px'
  },
  benefitCard: {
    padding: '32px 24px',
    backgroundColor: '#f9f9f9',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid #eee'
  },
  benefitIcon: { fontSize: '40px', display: 'block', marginBottom: '12px' },
  benefitTitle: { fontSize: '18px', fontWeight: '700', color: '#2d6a4f', marginBottom: '8px' },
  benefitDesc: { fontSize: '14px', color: '#777', lineHeight: '1.6' },

  // Products
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
    marginBottom: '40px'
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #eee',
    textAlign: 'left'
  },
  productIconWrapper: {
    backgroundColor: '#f0faf5',
    padding: '32px',
    textAlign: 'center',
    borderBottom: '1px solid #eee'
  },
  productIcon: { fontSize: '64px' },
  productInfo: { padding: '20px' },
  productName: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px', margin: '0 0 8px 0' },
  productDesc: { fontSize: '14px', color: '#777', lineHeight: '1.6', marginBottom: '16px', margin: '0 0 16px 0' },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: { color: '#2d6a4f', fontWeight: '800', fontSize: '16px' },
  productBtn: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '13px',
    padding: '8px 16px',
    borderRadius: '20px'
  },
  centerBtn: { textAlign: 'center', marginTop: '32px' },

  // Ingredients
  ingredientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  },
  ingredientCard: {
    backgroundColor: '#f0faf5',
    borderRadius: '16px',
    padding: '24px 20px',
    textAlign: 'center',
    border: '1px solid #d4edda'
  },
  ingredientEmoji: { fontSize: '44px', marginBottom: '10px' },
  ingredientBadge: {
    display: 'inline-block',
    backgroundColor: '#2d6a4f',
    color: 'white',
    fontSize: '10px',
    fontWeight: '700',
    padding: '3px 10px',
    borderRadius: '10px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  ingredientName: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#2d6a4f',
    margin: '0 0 8px 0'
  },
  ingredientDesc: {
    fontSize: '12px',
    color: '#666',
    lineHeight: '1.6',
    margin: 0
  },

  // CTA
  ctaSection: {
    backgroundColor: '#2d6a4f',
    padding: '80px 8%',
    textAlign: 'center'
  },
  ctaPlants: { fontSize: '24px', marginBottom: '16px' },
  ctaTitle: { fontSize: '36px', fontWeight: '700', color: 'white', marginBottom: '12px' },
  ctaSubtitle: { fontSize: '16px', color: '#b7dfc9', marginBottom: '36px' },
  ctaButtons: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  ctaPrimaryBtn: {
    backgroundColor: 'white', color: '#2d6a4f',
    padding: '14px 28px', borderRadius: '30px',
    textDecoration: 'none', fontSize: '15px', fontWeight: '700',
    display: 'inline-block'
  },
  ctaSecondaryBtn: {
    backgroundColor: 'transparent', color: 'white',
    padding: '14px 28px', borderRadius: '30px',
    textDecoration: 'none', fontSize: '15px', fontWeight: '600',
    border: '2px solid white', display: 'inline-block'
  },

  // Footer
  footer: { backgroundColor: '#1a1a2e', padding: '40px', textAlign: 'center' },
  footerPlants: { fontSize: '24px', marginBottom: '12px', letterSpacing: '8px' },
  footerText: { color: '#aaa', fontSize: '15px', marginBottom: '4px' },
  footerSub: { color: '#666', fontSize: '13px' }
};

export default Home;