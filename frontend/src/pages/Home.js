import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const products = [
  { icon: '🧴', name: 'Body Lotion', desc: 'Deep moisturizing with ayurvedic herbs' },
  { icon: '🫧', name: 'Face Wash', desc: 'Gentle cleansing with natural extracts' },
  { icon: '✨', name: 'Face Cream', desc: 'Nourishing cream for glowing skin' },
  { icon: '💧', name: 'Serum', desc: 'Concentrated ayurvedic healing serum' },
  { icon: '🌱', name: 'Aloe Vera Gel', desc: 'Pure soothing aloe vera gel' },
  { icon: '💆', name: 'Hair Oil', desc: 'Traditional hair nourishment blend' }
];

const benefits = [
  { icon: '🌿', title: '100% Natural', desc: 'All ingredients sourced from nature' },
  { icon: '🧪', title: 'Ayurvedic Formula', desc: 'Ancient wisdom meets modern science' },
  { icon: '💚', title: 'Cruelty Free', desc: 'Never tested on animals' },
  { icon: '🌍', title: 'Eco Friendly', desc: 'Sustainable and ethical packaging' }
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={styles.page}>

      {/* Hero Section */}
      <section style={styles.hero}>
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
          <div style={styles.heroButtons}>
            {user ? (
              <Link to="/products" style={styles.primaryBtn}>
                Shop Now →
              </Link>
            ) : (
              <>
                <Link to="/register" style={styles.primaryBtn}>
                  Get Started →
                </Link>
                <Link to="/products" style={styles.secondaryBtn}>
                  View Products
                </Link>
              </>
            )}
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.heroCircle}>
            <span style={styles.heroEmoji}>🌸</span>
          </div>
          <div style={styles.floatBadge1}>✨ Natural</div>
          <div style={styles.floatBadge2}>🌿 Ayurvedic</div>
          <div style={styles.floatBadge3}>💚 Pure</div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Orica?</h2>
        <p style={styles.sectionSubtitle}>
          We believe beauty should be pure, natural and kind to your skin
        </p>
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

      {/* Products Preview Section */}
      <section style={{ ...styles.section, backgroundColor: '#f0faf5' }}>
        <h2 style={styles.sectionTitle}>Our Products</h2>
        <p style={styles.sectionSubtitle}>
          Explore our range of ayurvedic beauty essentials
        </p>
        <div style={styles.productsGrid}>
          {products.map((p, i) => (
            <div key={i} style={styles.productCard}>
              <div style={styles.productIcon}>{p.icon}</div>
              <h3 style={styles.productName}>{p.name}</h3>
              <p style={styles.productDesc}>{p.desc}</p>
              <Link to="/products" style={styles.productBtn}>
                View Details →
              </Link>
            </div>
          ))}
        </div>
        <div style={styles.centerBtn}>
          <Link to="/products" style={styles.primaryBtn}>
            See All Products →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Natural Beauty Journey?</h2>
          <p style={styles.ctaSubtitle}>
            Join thousands of happy customers who trust Orica for their beauty needs
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/register" style={styles.ctaPrimaryBtn}>
              Create Free Account →
            </Link>
            <Link to="/login" style={styles.ctaSecondaryBtn}>
              Already a member? Login
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          🌿 Orica — Pure Ayurvedic Beauty © 2024
        </p>
        <p style={styles.footerSub}>
          Made with 💚 using natural ingredients
        </p>
      </footer>

    </div>
  );
};

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", color: '#333' },

  // Hero
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '80px 8%',
    backgroundColor: 'white',
    minHeight: '85vh'
  },
  heroContent: { flex: 1, maxWidth: '520px' },
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
    marginBottom: '32px'
  },
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

  // Hero Image
  heroImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '420px'
  },
  heroCircle: {
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    backgroundColor: '#e8f5e9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #b7dfc9'
  },
  heroEmoji: { fontSize: '120px' },
  floatBadge1: {
    position: 'absolute', top: '40px', right: '60px',
    backgroundColor: 'white', padding: '8px 16px',
    borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontWeight: '600', fontSize: '14px', color: '#2d6a4f'
  },
  floatBadge2: {
    position: 'absolute', bottom: '80px', left: '40px',
    backgroundColor: 'white', padding: '8px 16px',
    borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontWeight: '600', fontSize: '14px', color: '#2d6a4f'
  },
  floatBadge3: {
    position: 'absolute', bottom: '40px', right: '80px',
    backgroundColor: '#2d6a4f', padding: '8px 16px',
    borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    fontWeight: '600', fontSize: '14px', color: 'white'
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
    padding: '32px 24px',
    textAlign: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #eee',
    transition: 'transform 0.2s'
  },
  productIcon: { fontSize: '48px', marginBottom: '16px' },
  productName: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' },
  productDesc: { fontSize: '14px', color: '#777', lineHeight: '1.6', marginBottom: '20px' },
  productBtn: {
    color: '#2d6a4f',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px'
  },
  centerBtn: { textAlign: 'center', marginTop: '16px' },

  // CTA
  ctaSection: {
    backgroundColor: '#2d6a4f',
    padding: '80px 8%',
    textAlign: 'center'
  },
  ctaTitle: { fontSize: '36px', fontWeight: '700', color: 'white', marginBottom: '12px' },
  ctaSubtitle: { fontSize: '16px', color: '#b7dfc9', marginBottom: '36px' },
  ctaButtons: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  ctaPrimaryBtn: {
    backgroundColor: 'white',
    color: '#2d6a4f',
    padding: '14px 28px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '700',
    display: 'inline-block'
  },
  ctaSecondaryBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '600',
    border: '2px solid white',
    display: 'inline-block'
  },

  // Footer
  footer: {
    backgroundColor: '#1a1a2e',
    padding: '32px',
    textAlign: 'center'
  },
  footerText: { color: '#aaa', fontSize: '15px', marginBottom: '4px' },
  footerSub: { color: '#666', fontSize: '13px' }
};

export default Home;