import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/b.png" alt="Book Club Logo" className="logo-image" />
        </Link>
      </div>
      <nav className="nav">
      <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/login" className="signup-button">Sign In</Link>
      </nav>
    </header>
  );
};

export default Header;