import { useState } from "react";
import "./SignUpPage.css"; // Added import for the CSS file

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    alert("Signup successful!");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Online Lab Platform</h1> {/* Title moved above the signup box */}
      <div className="form-container">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <select
              name="role"
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
