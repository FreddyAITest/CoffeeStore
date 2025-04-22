import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About Us</h1>
        
        {/* Our Story Section */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>Coffee Store was founded in 2010 by coffee enthusiasts who believed that a great cup of coffee could brighten anyone's day. What started as a small corner shop has grown into a beloved community gathering place.</p>
              <p>Our journey began with a simple mission: to serve exceptional coffee in a warm, welcoming environment. Over the years, we've stayed true to this mission while expanding our offerings and locations.</p>
              <p>We take pride in sourcing our beans ethically from around the world, working directly with farmers to ensure fair compensation and sustainable practices. Our beans are roasted locally in small batches to ensure the freshest cup possible.</p>
            </div>
            <div className="about-image placeholder"></div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="about-section values-section">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality</h3>
              <p>We never compromise on the quality of our ingredients. From our carefully selected coffee beans to our locally sourced milk and pastries, we ensure everything we serve meets our high standards.</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>We believe in creating spaces where people can connect, collaborate, and feel at home. Our coffee shop is designed to foster community and bring people together.</p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>We're committed to minimizing our environmental impact through sustainable sourcing, compostable packaging, and reducing waste wherever possible.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>While respecting coffee traditions, we're not afraid to experiment with new brewing methods and flavor combinations to create unique experiences for our customers.</p>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="about-section team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image placeholder"></div>
              <h3>Jane Doe</h3>
              <p className="member-title">Founder & Head Barista</p>
              <p>Jane has over 15 years of experience in the coffee industry and is a certified Q Grader.</p>
            </div>
            <div className="team-member">
              <div className="member-image placeholder"></div>
              <h3>John Smith</h3>
              <p className="member-title">Master Roaster</p>
              <p>John oversees our roasting process, ensuring each batch of beans reaches its full flavor potential.</p>
            </div>
            <div className="team-member">
              <div className="member-image placeholder"></div>
              <h3>Emily Johnson</h3>
              <p className="member-title">Pastry Chef</p>
              <p>Emily creates all our delicious pastries and baked goods fresh each morning.</p>
            </div>
          </div>
        </section>
        
        {/* Visit Us Section */}
        <section className="about-section visit-section">
          <div className="about-content">
            <div className="about-text">
              <h2>Visit Us</h2>
              <p>We'd love to welcome you to our coffee shop. Stop by for a cup of coffee, a bite to eat, or just to say hello!</p>
              <div className="location-info">
                <p><strong>Address:</strong> 123 Coffee Street, Brewville, CA 90210</p>
                <p><strong>Hours:</strong></p>
                <ul>
                  <li>Monday - Friday: 7am - 8pm</li>
                  <li>Saturday: 8am - 9pm</li>
                  <li>Sunday: 8am - 7pm</li>
                </ul>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> info@coffeestore.com</p>
              </div>
            </div>
            <div className="map-placeholder">
              <div className="placeholder">Map</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;