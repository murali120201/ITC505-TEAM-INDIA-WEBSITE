import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="wrapper">
      <div className="homepage">
        <header className="hero">
          <h1>Empowering Startups. Connecting Investors.</h1>
          <p>Your platform for pitch creation, mentorship, and funding.</p>

          <div className="cta-buttons">
            <Link
              to="/choose"
              state={{ role: 'startup' }}
              className="btn filled"
            >
              Join as a Startup
            </Link>

            <Link
              to="/choose"
              state={{ role: 'investor' }}
              className="btn outline"
            >
              Join as an Investor
            </Link>
          </div>
        </header>

        <section className="features">
          <h2>What We Offer</h2>
          <ul>
            <li>📄 Easy Pitch Deck Creation</li>
            <li>🔐 Secure AI Matchmaking</li>
            <li>🎓 Mentorship & Education</li>
            <li>📊 Insights & Investor Feedback</li>
          </ul>
        </section>

        <footer className="footer">
          &copy; {new Date().getFullYear()} PitchConnect. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Homepage;
