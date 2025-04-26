import React from 'react';
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div>
        <p> &copy;{new Date().getFullYear()} Store-React-Client | All right reserved  </p>
      </div>
    </footer>
  );
};

export default Footer; 