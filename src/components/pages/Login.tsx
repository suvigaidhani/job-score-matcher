import { useState } from "react";
import supabase from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const session = await supabase.auth.getSession();
  const role = session.data.session?.user?.user_metadata?.role;

  if (!role) {
    alert("Role missing. Please signup again.");
    return;
  }

  if (role === "employer") {
    navigate("/employer/jobs");
  } else {
    navigate("/candidate/jobs");
  }
}


  return (
    <div className="page-wrapper">
      <nav className="top-nav">
        <h1 className="logo">Job Match Scorer</h1>
        <span className="nav-link" onClick={() => navigate("/signup")}>
          Signup
        </span>
      </nav>

      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p className="footer-text">
          Don’t have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
