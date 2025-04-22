import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Coffee Store</h1>
          <p>Experience the finest coffee in town</p>
          <Link to="/menu" className="btn hero-btn">View Our Menu</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-products">
        <div className="container">
          <h2 className="section-title">Featured Drinks</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image placeholder"></div>
              <h3>Signature Latte</h3>
              <p>Our house specialty with a perfect blend of espresso and creamy milk.</p>
              <span className="price">$4.50</span>
            </div>
            <div className="product-card">
              <div className="product-image placeholder"></div>
              <h3>Cold Brew</h3>
              <p>Smooth and refreshing cold brew, steeped for 24 hours.</p>
              <span className="price">$4.75</span>
            </div>
            <div className="product-card">
              <div className="product-image placeholder"></div>
              <h3>Caramel Macchiato</h3>
              <p>Espresso with vanilla syrup, milk and caramel drizzle.</p>
              <span className="price">$5.25</span>
            </div>
          </div>
          <div className="center-btn">
            <Link to="/menu" className="btn">See Full Menu</Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>Coffee Store was founded in 2010 with a simple mission: to serve exceptional coffee in a warm, welcoming environment. We source our beans ethically from around the world and roast them locally to ensure the freshest cup possible.</p>
              <p>Our baristas are passionate about coffee and are trained to prepare your drink exactly how you like it.</p>
              <Link to="/about" className="btn">Learn More</Link>
            </div>
            <div className="about-image placeholder"></div>
          </div>
        </div>
      </section>

      {/* Calendar Preview */}
      <section className="section calendar-preview">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="calendar-intro">Join us for coffee tastings, live music, and more! Check our calendar for upcoming events.</p>
          <div className="center-btn">
            <Link to="/calendar" className="btn">View Calendar</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;