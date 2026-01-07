import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/><br/>
        <button>Login</button>
      </form>
    </div>
  );
}
