import { useState } from "react"; 

export default function JobTable({
  jobs,
  onEdit,
  onDelete,
  onQuickStatus,
}) {

  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case "applied": return { bg: "#fef3c7", text: "#92400e" };
      case "interview": return { bg: "#dcfce7", text: "#166534" };
      case "offer": return { bg: "#dbeafe", text: "#1e40af" };
      case "rejected": return { bg: "#fee2e2", text: "#991b1b" };
      default: return { bg: "#f3f4f6", text: "#374151" };
    }
  };

  return (
    <div style={container}>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Company</th>
            <th style={th}>Role</th>
            <th style={th}>Status</th>
            <th style={th}>Link</th>
            <th style={th}>Created</th>
            <th style={{ ...th, textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.length ? (
            jobs.map((j) => {
              const colors = getStatusStyle(j.status);
              const isHovered = hoveredRow === j._id;

              return (
                <tr 
                  key={j._id} 
                  onMouseEnter={() => setHoveredRow(j._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    ...tr,
                    backgroundColor: isHovered ? "#fdf8f5" : "transparent",
                  }}
                >
                  <td style={{ ...td, fontWeight: "600", color: "#4a3728" }}>{j.company}</td>
                  <td style={td}>{j.role}</td>
                  <td style={td}>
                    <select
                      value={j.status}
                      onChange={(e) => onQuickStatus(j._id, e.target.value)}
                      style={{
                        ...select,
                        backgroundColor: colors.bg,
                        color: colors.text,
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.2s ease"
                      }}
                    >
                      <option value="applied" style={optApplied}>Applied</option>
                      <option value="interview" style={optInterview}>Interview</option>
                      <option value="offer" style={optOffer}>Offer</option>
                      <option value="rejected" style={optRejected}>Rejected</option>
                    </select>
                  </td>
                  <td style={td}>
                    {j.jobLink ? (
                      <a href={j.jobLink} target="_blank" rel="noreferrer" style={link}>
                        Visit ↗
                      </a>
                    ) : (
                      <span style={{ color: "#d1d5db" }}>—</span>
                    )}
                  </td>
                  <td style={{ ...td, color: "#8c7662", fontSize: "13px" }}>
                    {j.createdAt ? new Date(j.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "-"}
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <button onClick={() => onEdit(j)} style={miniBtn}>Edit</button>
                    <button onClick={() => onDelete(j._id)} style={dangerBtn}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td style={{ ...td, textAlign: "center", padding: "40px" }} colSpan={6}>
                <div style={{ opacity: 0.5, fontSize: "16px" }}>No applications found yet.</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}



const container = {
  overflowX: "auto",
  marginTop: "24px",
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "8px",
  boxShadow: "0 10px 30px rgba(74, 55, 40, 0.06)",
  border: "1px solid #f3e6df",
  fontFamily: "Inter,'Segoe UI', Roboto, sans-serif"
};

const table = { 
  width: "100%", 
  borderCollapse: "separate", 
  borderSpacing: "0",
};

const th = { 
  textAlign: "left", 
  fontSize: "12px", 
  textTransform: "uppercase", 
  letterSpacing: "0.05em",
  color: "#8c7662", 
  padding: "16px 20px", 
  borderBottom: "1px solid #f3e6df" 
};

const tr = {
  transition: "all 0.2s ease",
};

const td = { 
  padding: "18px 20px", 
  borderBottom: "1px solid #faf7f5", 
  fontSize: "14px",
  color: "#5c4d42"
};

const select = { 
  padding: "6px 14px", 
  borderRadius: "100px", 
  border: "none", 
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
  outline: "none",
  appearance: "none", 
  textAlign: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
};

const link = {
  color: "#d97706",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "13px"
};

const miniBtn = {
  padding: "6px 14px",
  border: "1px solid #e8dfd8",
  background: "white",
  color: "#4a3728",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "8px",
  fontSize: "12px",
  fontWeight: "600",
};

const dangerBtn = {
  padding: "6px 14px",
  border: "1px solid #fee2e2",
  background: "#fff1f1",
  color: "#b91c1c",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "600",
};

const optApplied = { backgroundColor: "#fef3c7", color: "#92400e" };
const optInterview = { backgroundColor: "#dcfce7", color: "#166534" };
const optOffer = { backgroundColor: "#dbeafe", color: "#1e40af" };
const optRejected = { backgroundColor: "#fee2e2", color: "#991b1b" };