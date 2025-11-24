import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import "../styles/Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const navigate = useNavigate();

  async function handleSignup(e: any) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, 
      },
    });

    if (error) {
      if (error.message.includes("already registered"))
        return alert("User already registered");
      return alert(error.message);
    }

    const user = data.user;

    if (!user) return alert("Signup failed.");
    const { error: profileErr } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          role: role, 
          email: email,
        },
        { onConflict: "id" } 
      );

    if (profileErr) {
      console.log(profileErr);
      return alert("Failed to save profile. Try again.");
    }

    alert("Signup successful! Please login.");
    navigate("/login");
  }

  return (
    <div className="page-wrapper">
      <nav className="top-nav">
        <h1 className="logo">Job Matcher</h1>
        <span className="nav-link" onClick={() => navigate("/login")}>
          Login
        </span>
      </nav>

      <div className="signup-card">
        <h2>Create Your Account</h2>

        <form onSubmit={handleSignup}>
          <label>Email *</label> 
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="note">Note: Atleast 6 charachters</label>

          <label>Select Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>

          <button type="submit">Signup</button>
        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}