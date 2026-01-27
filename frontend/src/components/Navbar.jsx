import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthed } = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <Link to="/dashboard" style={styles.brand}>Job Tracker</Link>
      </div>

      <div style={styles.right}>
        {isAuthed ? (
          <>
            <span style={styles.user}>
              {user?.fullName || "User"}
            </span>
            <button onClick={onLogout} style={styles.btn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
  },
  left: { display: "flex", alignItems: "center", gap: 12 },
  brand: { fontWeight: 700, textDecoration: "none", color: "#111" },
  right: { display: "flex", alignItems: "center", gap: 12 },
  link: { textDecoration: "none", color: "#111" },
  user: { fontSize: 14, opacity: 0.8 },
  btn: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    background: "white",
    borderRadius: 8,
    cursor: "pointer",
  },
};
