export default function StatsCards({ stats }) {
  const total = stats?.data?.total ?? 0;
  const byStatus = stats?.data?.byStatus ?? {};

  const items = [
    ["Total", total],
    ["Applied", byStatus.applied ?? 0],
    ["Interview", byStatus.interview ?? 0],
    ["Offer", byStatus.offer ?? 0],
    ["Rejected", byStatus.rejected ?? 0],
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 10 }}>
      {items.map(([label, value]) => (
        <div key={label} style={card}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

const card = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 12,
  background: "white",
};
