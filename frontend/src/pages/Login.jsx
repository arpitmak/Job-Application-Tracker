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
        <h2 style={{ marginTop: 0 }}>Login</h2>

        <input placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} style={inp} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => set("password", e.target.value)} style={inp} />

        {err && <div style={errBox}>{err}</div>}

        <button type="submit" style={btn}>Login</button>

        <p style={{ fontSize: 14 }}>
          New here? <Link to="/register">Create account</Link>
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
