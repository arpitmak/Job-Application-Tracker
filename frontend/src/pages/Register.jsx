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
      setTimeout(() => nav("/login"), 400);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Register failed");
    }
  };

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div style={wrap}>
      <form onSubmit={onSubmit} style={card}>
        <h2 style={{ marginTop: 0 }}>Create account</h2>

        <input placeholder="Full name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} style={inp} />
        <input placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} style={inp} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => set("password", e.target.value)} style={inp} />
        <input type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} style={inp} />

        {err && <div style={errBox}>{err}</div>}
        {msg && <div style={okBox}>{msg}</div>}

        <button type="submit" style={btn}>Register</button>

        <p style={{ fontSize: 14 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

const wrap = { minHeight: "calc(100vh - 60px)", display: "grid", placeItems: "center", padding: 16 };
const card = { width: "100%", maxWidth: 420, border: "1px solid #eee", borderRadius: 14, padding: 16, background: "white" };
const inp = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", marginTop: 10 };
const btn = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #111", background: "#111", color: "white", cursor: "pointer", marginTop: 12 };
const errBox = { marginTop: 10, padding: 10, borderRadius: 10, background: "#fff0f0", border: "1px solid #f2c0c0", fontSize: 14 };
const okBox = { marginTop: 10, padding: 10, borderRadius: 10, background: "#eefdf3", border: "1px solid #bce8c8", fontSize: 14 };
