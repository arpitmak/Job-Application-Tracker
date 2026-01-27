export default function JobTable({
  jobs,
  onEdit,
  onDelete,
  onQuickStatus,
}) {
  return (
    <div style={{ overflowX: "auto", marginTop: 12 }}>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Company</th>
            <th style={th}>Role</th>
            <th style={th}>Status</th>
            <th style={th}>Link</th>
            <th style={th}>Created</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.length ? (
            jobs.map((j) => (
              <tr key={j._id}>
                <td style={td}>{j.company}</td>
                <td style={td}>{j.role}</td>
                <td style={td}>
                  <select
                    value={j.status}
                    onChange={(e) => onQuickStatus(j._id, e.target.value)}
                    style={select}
                  >
                    <option value="applied">applied</option>
                    <option value="interview">interview</option>
                    <option value="offer">offer</option>
                    <option value="rejected">rejected</option>
                  </select>
                </td>
                <td style={td}>
                  {j.jobLink ? (
                    <a href={j.jobLink} target="_blank" rel="noreferrer">
                      open
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td style={td}>
                  {j.createdAt ? new Date(j.createdAt).toLocaleDateString() : "-"}
                </td>
                <td style={td}>
                  <button onClick={() => onEdit(j)} style={miniBtn}>Edit</button>
                  <button onClick={() => onDelete(j._id)} style={dangerBtn}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={td} colSpan={6}>No jobs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const table = { width: "100%", borderCollapse: "collapse" };
const th = { textAlign: "left", fontSize: 12, opacity: 0.7, padding: 10, borderBottom: "1px solid #eee" };
const td = { padding: 10, borderBottom: "1px solid #f3f3f3", fontSize: 14 };

const select = { padding: "6px 8px", borderRadius: 8, border: "1px solid #ddd" };

const miniBtn = {
  padding: "6px 10px",
  border: "1px solid #ddd",
  background: "white",
  borderRadius: 8,
  cursor: "pointer",
  marginRight: 8,
};

const dangerBtn = {
  padding: "6px 10px",
  border: "1px solid #f2c0c0",
  background: "white",
  borderRadius: 8,
  cursor: "pointer",
};
