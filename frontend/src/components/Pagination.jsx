export default function Pagination({ page, totalPages, onPageChange }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div style={container}>
      <button 
        disabled={!canPrev} 
        onClick={() => onPageChange(page - 1)} 
        style={{ ...btn, opacity: canPrev ? 1 : 0.4, cursor: canPrev ? "pointer" : "not-allowed" }}
      >
        ← Previous
      </button>

      <div style={indicator}>
        <span style={currentLabel}>Page</span>
        <div style={pageBadge}>{page}</div>
        <span style={totalLabel}>of {totalPages || 1}</span>
      </div>

      <button 
        disabled={!canNext} 
        onClick={() => onPageChange(page + 1)} 
        style={{ ...btn, opacity: canNext ? 1 : 0.4, cursor: canNext ? "pointer" : "not-allowed" }}
      >
        Next →
      </button>
    </div>
  );
}



const container = { 
  display: "flex", 
  gap: "16px", 
  alignItems: "center", 
  justifyContent: "center",
  marginTop: "32px",
  paddingBottom: "40px" 
};

const btn = {
  padding: "10px 18px",
  border: "1px solid #e8dfd8",
  background: "white",
  color: "#4a3728",
  borderRadius: "12px",
  fontSize: "13px",
  fontWeight: "600",
  transition: "all 0.2s ease",
  boxShadow: "0 2px 4px rgba(74, 55, 40, 0.05)",
};

const indicator = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background: "#f3e6df",
  padding: "4px 12px",
  borderRadius: "100px",
  border: "1px solid #e8dfd8",
};

const currentLabel = {
  fontSize: "12px",
  color: "#8c7662",
  fontWeight: "500",
};

const pageBadge = {
  background: "#d97706",
  color: "white",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "700",
};

const totalLabel = {
  fontSize: "12px",
  color: "#4a3728",
  fontWeight: "600",
};
