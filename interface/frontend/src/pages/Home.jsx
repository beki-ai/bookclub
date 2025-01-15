import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Step into a world of stories</h1>
          <p>
            Discover new books to read or share your own writing with a community of fellow book lovers.
            Whether you’re a reader or an author, there’s a place for you here to explore, create, and connect.
          </p>
          <Link to="/register" className="join-button">join now and start your literary journey</Link>
        </div>
        <img src="/photo-maquette.jpg" alt="Book Club" className="hero-image" />
      </header>

      <section className="latest-updates">
        <h2>Latest Book Updates</h2>
        <div className="books-grid">
          <div className="book-card">
            <img src="/how-to.jpg" alt="How to Stop Worrying and Start Living" />
            <p>How to break the worry habit before it breaks you - Dale Carnegie</p>
          </div>
          <div className="book-card">
            <img src="/the-diary.jpg" alt="The Diary of a CEO" />
            <p>Your health is your first foundation - Steven Bartlett</p>
          </div>
          <div className="book-card">
            <img src="/the-book-of-moods.jpg" alt="The Book of Moods" />
            <p>You can reduce stress by meeting it differently - Lauren Martin</p>
          </div>
        </div>
        <Link to="/books" className="see-more-button">See More Books</Link>
      </section>
    </div>
  );
};

export default Home;