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
        <div style={header}>
          <div>
            <h3 style={title}>{initial ? "Edit Listing" : "New Application"}</h3>
            <p style={subtitle}>Keep your job search organized.</p>
          </div>
          <button onClick={onClose} style={xBtn}>✕</button>
        </div>

        <form onSubmit={submit} style={formGrid}>
          <div style={row}>
            <input placeholder="Company Name *" value={form.company} onChange={(e) => set("company", e.target.value)} style={inp} />
            <input placeholder="Role / Position *" value={form.role} onChange={(e) => set("role", e.target.value)} style={inp} />
          </div>

          <input placeholder="Job Posting URL" value={form.jobLink} onChange={(e) => set("jobLink", e.target.value)} style={inp} />

          <div style={selectWrapper}>
            <label style={selectLabel}>Application Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} style={selectInp}>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <textarea placeholder="Brief Job Description..." value={form.jobDescription} onChange={(e) => set("jobDescription", e.target.value)} style={txt} />
          <textarea placeholder="Personal Notes (Culture, salary, etc.)" value={form.notes} onChange={(e) => set("notes", e.target.value)} style={txt} />

          <div style={footer}>
            <button type="button" onClick={onClose} style={btn2}>Discard</button>
            <button type="submit" style={btn1}>{initial ? "Save Changes" : "Add to Tracker"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Warm & Modern Modal Styles ---

const overlay = {
  position: "fixed", 
  inset: 0, 
  background: "rgba(74, 55, 40, 0.4)", // Deep warm brown tint
  backdropFilter: "blur(8px)",
  display: "grid", 
  placeItems: "center", 
  padding: 20, 
  zIndex: 1000,
};

const modal = { 
  width: "100%", 
  maxWidth: 580, 
  background: "#ffffff", 
  borderRadius: 24, 
  padding: 32,
  boxShadow: "0 25px 50px -12px rgba(74, 55, 40, 0.25)",
  border: "1px solid #f3e6df"
};

const header = { 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "flex-start",
  marginBottom: 24 
};

const title = { 
  margin: 0, 
  fontSize: 22, 
  fontWeight: 700, 
  color: "#4a3728" 
};

const subtitle = {
  margin: "4px 0 0 0",
  fontSize: 14,
  color: "#8c7662"
};

const formGrid = { 
  display: "grid", 
  gap: 16 
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12
};

const inp = { 
  width: "100%",
  padding: "12px 16px", 
  borderRadius: 12, 
  border: "1px solid #e8dfd8", 
  background: "#fcfaf9",
  fontSize: 14,
  outline: "none",
  color: "#4a3728",
  boxSizing: "border-box"
};

const selectWrapper = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 6
};

const selectLabel = {
  fontSize: 12,
  fontWeight: 600,
  color: "#8c7662",
  paddingLeft: 4
};

const selectInp = {
  ...inp,
  appearance: "none",
  cursor: "pointer",
};

const txt = { 
  ...inp, 
  minHeight: 100, 
  resize: "vertical",
  fontFamily: "inherit" 
};

const footer = { 
  display: "flex", 
  gap: 12, 
  justifyContent: "flex-end", 
  marginTop: 8 
};

const btn1 = { 
  padding: "12px 24px", 
  borderRadius: 12, 
  border: "none", 
  background: "#d97706", 
  color: "white", 
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(217, 119, 6, 0.2)"
};

const btn2 = { 
  padding: "12px 24px", 
  borderRadius: 12, 
  border: "1px solid #e8dfd8", 
  background: "transparent", 
  color: "#8c7662",
  fontWeight: 600,
  cursor: "pointer" 
};

const xBtn = { 
  border: "none", 
  background: "#fff7f2", 
  color: "#d97706",
  borderRadius: "50%", 
  width: 32, 
  height: 32, 
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  fontWeight: "bold"
};