import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      await register(form);
      setMsg("Registered successfully. Please login.");
      setTimeout(() => nav("/login"), 800);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Register failed");
    }
  };

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div style={wrap}>
      <form onSubmit={onSubmit} style={card}>
        

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={title}>Create Account</h2>
          <p style={subtitle}>Join us and start tracking your journey.</p>
        </div>

        <div style={field}>
          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            style={inp}
          />
        </div>

        <div style={field}>
          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            style={inp}
          />
        </div>

        <div style={field}>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            style={inp}
          />
        </div>

        <div style={field}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => set("confirmPassword", e.target.value)}
            style={inp}
          />
        </div>

        {err && <div style={errBox}>{err}</div>}
        {msg && <div style={okBox}>{msg}</div>}

        <button type="submit" style={btn}>
          Create Account
        </button>

        <p style={foot}>
          Already have an account?{" "}
          <Link to="/login" style={link}>
            Login
          </Link>
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
  maxWidth: "420px", 
  backgroundColor: "#ffffff", 
  borderRadius: "28px", 
  padding: "48px 40px", 
  boxShadow: "0 20px 40px rgba(184, 115, 81, 0.1)", 
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
  margin: "0 auto 16px auto",
  border: "1px solid #f3e6df"
};

const title = { 
  margin: "0 0 8px 0", 
  fontSize: "24px", 
  fontWeight: "600", 
  color: "#4a3728", 
  letterSpacing: "-0.3px",
  textAlign: "center"
};

const subtitle = {
  margin: "0",
  fontSize: "15px",
  color: "#8c7662",
  textAlign: "center"
};

const field = { 
  marginBottom: "12px" 
};

const inp = { 
  width: "100%", 
  padding: "14px 16px", 
  borderRadius: "14px", 
  border: "1px solid #e8dfd8", 
  background: "#fcfaf9",
  fontSize: "14px",
  outline: "none",
  color: "#4a3728",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
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
  marginTop: "16px", 
  padding: "12px", 
  borderRadius: "12px", 
  background: "#fff1f1", 
  border: "1px solid #fee2e2", 
  color: "#b91c1c",
  fontSize: "13px",
  textAlign: "center"
};

const okBox = { 
  marginTop: "16px", 
  padding: "12px", 
  borderRadius: "12px", 
  background: "#f0fdf4", 
  border: "1px solid #dcfce7", 
  color: "#166534",
  fontSize: "13px",
  textAlign: "center"
};

const foot = { 
  marginTop: "28px", 
  fontSize: "14px", 
  color: "#8c7662", 
  textAlign: "center" 
};

const link = { 
  color: "#d97706", 
  textDecoration: "none", 
  fontWeight: "600",
  marginLeft: "4px"
};