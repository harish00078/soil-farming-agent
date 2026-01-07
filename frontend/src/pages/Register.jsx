import { useState } from "react";
import api from "../services/api";

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} /><br/><br/>
        <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} /><br/><br/>
        <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})} /><br/><br/>
        <button>Register</button>
      </form>
    </div>
  );
}
