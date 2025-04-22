import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Coffee Store</h3>
          <p>Your cozy place for great coffee and memorable moments.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>123 Coffee Street</p>
          <p>Brewville, CA 90210</p>
          <p>Phone: (555) 123-4567</p>
          <p>Email: info@coffeestore.com</p>
        </div>
        
        <div className="footer-section">
          <h4>Hours</h4>
          <p>Monday - Friday: 7am - 8pm</p>
          <p>Saturday: 8am - 9pm</p>
          <p>Sunday: 8am - 7pm</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Coffee Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;