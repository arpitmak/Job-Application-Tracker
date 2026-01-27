export default function Pagination({ page, totalPages, onPageChange }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
      <button disabled={!canPrev} onClick={() => onPageChange(page - 1)} style={btn}>
        Prev
      </button>

      <span style={{ fontSize: 14 }}>
        Page <b>{page}</b> / {totalPages || 1}
      </span>

      <button disabled={!canNext} onClick={() => onPageChange(page + 1)} style={btn}>
        Next
      </button>
    </div>
  );
}

const btn = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  background: "white",
  borderRadius: 8,
  cursor: "pointer",
};
