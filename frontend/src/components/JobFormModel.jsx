import { useEffect, useState } from "react";

export default function JobFormModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    jobLink: "",
    jobDescription: "",
    status: "applied",
    notes: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        company: initial.company || "",
        role: initial.role || "",
        jobLink: initial.jobLink || "",
        jobDescription: initial.jobDescription || "",
        status: initial.status || "applied",
        notes: initial.notes || "",
      });
    } else {
      setForm({
        company: "",
        role: "",
        jobLink: "",
        jobDescription: "",
        status: "applied",
        notes: "",
      });
    }
  }, [initial, open]);

  if (!open) return null;

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>{initial ? "Edit Job" : "Add Job"}</h3>
          <button onClick={onClose} style={xBtn}>✕</button>
        </div>

        <form onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <input placeholder="Company *" value={form.company} onChange={(e) => set("company", e.target.value)} style={inp} />
          <input placeholder="Role *" value={form.role} onChange={(e) => set("role", e.target.value)} style={inp} />
          <input placeholder="Job Link" value={form.jobLink} onChange={(e) => set("jobLink", e.target.value)} style={inp} />

          <select value={form.status} onChange={(e) => set("status", e.target.value)} style={inp}>
            <option value="applied">applied</option>
            <option value="interview">interview</option>
            <option value="offer">offer</option>
            <option value="rejected">rejected</option>
          </select>

          <textarea placeholder="Job Description" value={form.jobDescription} onChange={(e) => set("jobDescription", e.target.value)} style={txt} />
          <textarea placeholder="Notes" value={form.notes} onChange={(e) => set("notes", e.target.value)} style={txt} />

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} style={btn2}>Cancel</button>
            <button type="submit" style={btn1}>{initial ? "Save" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)",
  display: "grid", placeItems: "center", padding: 16, zIndex: 50,
};
const modal = { width: "100%", maxWidth: 560, background: "white", borderRadius: 14, padding: 16 };
const inp = { padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd" };
const txt = { padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", minHeight: 90 };
const btn1 = { padding: "10px 14px", borderRadius: 10, border: "1px solid #111", background: "#111", color: "white", cursor: "pointer" };
const btn2 = { padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", background: "white", cursor: "pointer" };
const xBtn = { border: "1px solid #eee", background: "white", borderRadius: 10, padding: "6px 10px", cursor: "pointer" };
