export default function StatsCards({ stats }) {
  const total = stats?.data?.total ?? 0;
  const byStatus = stats?.data?.byStatus ?? {};

  const items = [
    { label: "Total Applications", value: total, color: "#4a3728" },
    { label: "Applied", value: byStatus.applied ?? 0, color: "#92400e" },
    { label: "Interviews", value: byStatus.interview ?? 0, color: "#166534" },
    { label: "Offers", value: byStatus.offer ?? 0, color: "#1e40af" },
    { label: "Rejected", value: byStatus.rejected ?? 0, color: "#991b1b" },
  ];

  return (
    <div style={grid}>
      {items.map((item) => (
        <div key={item.label} style={{ ...card }}>
          <span style={labelStyle}>{item.label}</span>
          <span style={{ ...valueStyle, color: item.color }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}


const grid = { 
  display: "grid", 
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
  gap: "16px",
  marginBottom: "32px"
};

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "24px 16px",
  boxShadow: "0 4px 12px rgba(74, 55, 40, 0.03)",
  border: "1px solid #f3e6df",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  textAlign: "center" 
};

const labelStyle = { 
  fontSize: "11px", 
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#8c7662",
  opacity: 0.8
};

const valueStyle = { 
  fontSize: "36px", 
  fontWeight: "800",
  fontFamily: "inherit",
  lineHeight: "1"
};