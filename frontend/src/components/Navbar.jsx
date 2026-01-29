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
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/dashboard" style={styles.brand}>
          
          JobTracker
        </Link>
      </div>

      <div style={styles.right}>
        {isAuthed ? (
          <>
            <div style={styles.userInfo}>
              
             <span style={styles.userName}> {user?.fullName || "User"}</span>
            </div>
            <button onClick={onLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px",
    background: "rgba(253, 248, 245, 0.8)", // Matching warm cream with transparency
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #f3e6df",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "Inter,'Segoe UI', Roboto, sans-serif",
  },
  left: { 
    display: "flex", 
    alignItems: "center" 
  },
  brand: { 
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 700, 
    fontSize: "20px",
    textDecoration: "none", 
    color: "#4a3728", 
    letterSpacing: "-0.5px"
  },
  logoIcon: {
    fontSize: "22px",
    background: "#fff7f2",
    padding: "4px",
    borderRadius: "8px",
    border: "1px solid #f3e6df"
  },
  right: { 
    display: "flex", 
    alignItems: "center", 
    gap: "24px" 
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "centre",
    justifyContent:"centre",
    gap: "3px"
  },
  userLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#8c7662",
    fontWeight: 600
  },
  userName: { 
    fontSize: "16px", 
    fontWeight: "600",
    color: "#4a3728",
     
  },
  link: { 
    textDecoration: "none", 
    color: "#8c7662", 
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.2s"
  },
  registerBtn: {
    textDecoration: "none",
    padding: "10px 20px",
    background: "#d97706", 
    color: "white",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(217, 119, 6, 0.2)",
  },
  logoutBtn: {
    padding: "8px 16px",
    border: "1px solid #e8dfd8",
    background: "white",
    color: "#4a3728",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};