import { useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); // Save role for UI logic
      navigate('/soils');
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <motion.div 
      className="glass-panel"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <h2 style={{ textAlign: "center" }}>Welcome Back</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button style={{ width: "100%", marginTop: 10 }}>Login</button>
      </form>
    </motion.div>
  );
}