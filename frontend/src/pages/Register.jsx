import { useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <motion.div 
      className="glass-panel"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50 }}
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <h2 style={{ textAlign: "center" }}>Join Us</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})} />
        <button style={{ width: "100%", marginTop: 10 }}>Register</button>
      </form>
    </motion.div>
  );
}