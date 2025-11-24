import "./Home.css";
import { FaUserTie, FaUsers, FaSignInAlt, FaUserPlus,  FaPaperPlane  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-content">
          <h2 className="nav-logo">JobMatcher</h2>

          <div className="nav-links">
            <button className="nav-btn-small" onClick={() => navigate("/login")}>
              <FaSignInAlt /> Login
            </button>
            <button
              className="nav-btn-outline-small"
              onClick={() => navigate("/signup")}
            >
             <FaUserPlus /> Signup
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-text-box">
          <h1 className="hero-title">Discover Opportunities</h1>
          <p className="hero-subtitle">
            Your next big career move begins with smart AI-driven matching.
          </p>

        </div>
      </section>

      {/* FEATURES */}
      <section className="features-row">
        <div className="feature-card">
          <FaUserTie className="feature-icon" />
          <h3>Smart Matching</h3>
          <p>AI compares resumes with job requirements for accuracy.</p>
        </div>

        <div className="feature-card">
          <FaUsers className="feature-icon" />
          <h3>Trusted Profiles</h3>
          <p>Real users, verified details, and quality applications.</p>
        </div>

        <div className="feature-card">
          <FaUserTie className="feature-icon" />
          <h3>Faster Hiring</h3>
          <p>Employers can shortlist candidates in seconds.</p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <h2>Join Job Matcher Today</h2>
        <p>Connect with opportunities tailored to your skills.</p>

        <div className="cta-buttons">
          <button className="cta-btn-small" onClick={() => navigate("/signup")}>
            I'm a Candidate
          </button>

          <button
            className="cta-btn-outline-small"
            onClick={() => navigate("/signup")}
          >
            I'm an Employer
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} JobMatcher — Smart Job Matching Powered
          by AI
        </p>
      </footer>
    </div>
  );
}
