import { useState } from "react";
import "./LoginPage.css"; // Import the CSS file

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace console.log with actual login logic if needed
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Online Lab Platform</h1>
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-footer">
          Forgot password? <a href="#" className="login-link">Reset here</a>
        </p>
      </div>
    </div>
  );
}
