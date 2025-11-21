import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title" onClick={() => navigate("/")}>
          Sign In to Your Account
        </h1>

        <button
          className="navbar-btn"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </nav>
  );
}
