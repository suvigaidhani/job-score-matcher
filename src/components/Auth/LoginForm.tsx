import { useState } from "react";
import "./LoginForm.css";

export default function LoginForm({ email, password, setEmail, setPassword, handleLogin }: any) {
  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-input"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          className="form-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="form-btn" type="submit">
        Login
      </button>
    </form>
  );
}
