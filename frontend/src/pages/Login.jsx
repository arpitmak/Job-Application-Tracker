import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(form);
      nav("/dashboard");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    }
  };

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div style={wrap}>
      <form onSubmit={onSubmit} style={card}>
        
        
        <h2 style={title}>Welcome Back</h2>
        <p style={subtitle}>Log in to your account to continue.</p>

        <div style={inputGroup}>
          <input 
            placeholder="Email Address" 
            value={form.email} 
            onChange={(e) => set("email", e.target.value)} 
            style={inp} 
          />
        </div>

        <div style={inputGroup}>
          <input 
            type="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={(e) => set("password", e.target.value)} 
            style={inp} 
          />
        </div>

        {err && <div style={errBox}>{err}</div>}

        <button type="submit" style={btn}>Login</button>

        <p style={footerText}>
          Don't have an account? <Link to="/register" style={link}>Register</Link>
        </p>
      </form>
    </div>
  );
}



const wrap = { 
  minHeight: "100vh", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  padding: "20px",
  background: "#fdf8f5", 
  fontFamily: "Inter,'Segoe UI', Roboto, sans-serif"
};

const card = { 
  width: "100%", 
  maxWidth: "400px", 
  backgroundColor: "#ffffff", 
  borderRadius: "28px", 
  padding: "48px 40px", 
  boxShadow: "0 20px 40px rgba(184, 115, 81, 0.1)", 
  textAlign: "center",
  border: "1px solid #f3e6df"
};

const iconContainer = {
  width: "56px",
  height: "56px",
  backgroundColor: "#fff7f2",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px auto",
  border: "1px solid #f3e6df"
};

const title = { 
  margin: "0 0 8px 0", 
  fontSize: "24px", 
  fontWeight: "600", 
  color: "#4a3728", 
  letterSpacing: "-0.3px"
};

const subtitle = {
  margin: "0 0 32px 0",
  fontSize: "15px",
  color: "#8c7662", 
};

const inputGroup = {
  marginBottom: "12px"
};

const inp = { 
  width: "100%", 
  padding: "14px 16px", 
  borderRadius: "14px", 
  border: "1px solid #e8dfd8", 
  background: "#fcfaf9",
  fontSize: "15px",
  outline: "none",
  color: "#4a3728",
  transition: "all 0.2s ease",
  boxSizing: "border-box"
};

const btn = { 
  width: "100%", 
  padding: "16px", 
  borderRadius: "14px", 
  border: "none", 
  background: "#d97706", 
  color: "white", 
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer", 
  marginTop: "16px",
  boxShadow: "0 4px 12px rgba(217, 119, 6, 0.25)",
};

const errBox = { 
  marginTop: "12px", 
  padding: "12px", 
  borderRadius: "10px", 
  background: "#fff1f1", 
  border: "1px solid #fee2e2", 
  color: "#b91c1c",
  fontSize: "13px"
};

const footerText = { 
  fontSize: "14px", 
  marginTop: "28px", 
  color: "#8c7662" 
};

const link = {
  color: "#d97706",
  textDecoration: "none",
  fontWeight: "600",
  paddingLeft: "4px"
};