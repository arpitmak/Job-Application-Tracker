import { useEffect, useMemo, useState } from "react";
import client from "../api/client";
import StatsCards from "../components/StatsCard";
import JobTable from "../components/JobTable";
import Pagination from "../components/Pagination";
import JobFormModal from "../components/JobFormModel";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(""); 
  const [search, setSearch] = useState(""); 
  const [searchLive, setSearchLive] = useState(""); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setSearchLive(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (status) params.set("status", status);
    if (searchLive.trim()) params.set("search", searchLive.trim());
    return params.toString();
  }, [page, limit, status, searchLive]);

  const fetchStats = async () => {
    const res = await client.get("/jobs/stats");
    setStats(res.data);
  };

  const fetchJobs = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await client.get(`/jobs?${query}`);
      setJobs(res.data.results || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats().catch(() => {});
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [status, searchLive, limit]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (job) => {
    setEditing(job);
    setModalOpen(true);
  };

  const saveJob = async (payload) => {
    try {
      if (editing?._id) {
        await client.patch(`/jobs/${editing._id}`, payload);
      } else {
        await client.post("/jobs", payload);
      }
      setModalOpen(false);
      setEditing(null);
      await Promise.allSettled([fetchJobs(), fetchStats()]);
    } catch (e) {
      alert(e?.response?.data?.message || "Save failed");
    }
  };

  const deleteJob = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      await client.delete(`/jobs/${id}`);
      await Promise.allSettled([fetchJobs(), fetchStats()]);
    } catch (e) {
      alert(e?.response?.data?.message || "Delete failed");
    }
  };

  const quickStatus = async (id, newStatus) => {
    try {
      await client.patch(`/jobs/${id}/status`, { status: newStatus });
      await Promise.allSettled([fetchJobs(), fetchStats()]);
    } catch (e) {
      alert(e?.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div style={container}>
      <header style={header}>
        <div>
          <h2 style={title}>Main Dashboard</h2>
          <p style={subtitle}>Overview of your current job hunt</p>
        </div>
        <button onClick={openCreate} style={primaryBtn}>+ Add New Job</button>
      </header>

      <StatsCards stats={stats} />

      <div style={toolbar}>
        <div style={filterGroup}>
          <div style={searchWrapper}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company or role..."
              style={searchInp}
            />
          </div>

          <select value={status} onChange={(e) => setStatus(e.target.value)} style={selectInp}>
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} style={selectInp}>
            <option value={5}>Show 5</option>
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
          </select>
        </div>
      </div>

      {err && <div style={errBox}>{err}</div>}
      
      {loading ? (
        <div style={loadingState}>
          <div style={spinner}></div>
          <p>Refreshing your listings...</p>
        </div>
      ) : (
        <div style={{ animation: "fadeIn 0.5s ease" }}>
          <JobTable
            jobs={jobs}
            onEdit={openEdit}
            onDelete={deleteJob}
            onQuickStatus={quickStatus}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      <JobFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={saveJob}
        initial={editing}
      />
    </div>
  );
}


const container = { 
  padding: "40px 20px", 
  maxWidth: 1140, 
  margin: "0 auto",
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
  color: "#4a3728"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "32px",
  flexWrap: "wrap",
  gap: "20px"
};

const title = { 
  margin: 0, 
  fontSize: "28px", 
  fontWeight: "800",
  letterSpacing: "-0.5px"
};

const subtitle = {
  margin: "4px 0 0 0",
  fontSize: "15px",
  color: "#8c7662"
};

const toolbar = {
  marginTop: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
};

const filterGroup = { 
  display: "flex", 
  gap: "12px", 
  alignItems: "center", 
  width: "100%",
  flexWrap: "wrap" 
};

const primaryBtn = {
  padding: "12px 24px",
  borderRadius: "14px",
  border: "none",
  background: "#d97706",
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(217, 119, 6, 0.2)",
  transition: "transform 0.2s ease"
};

const searchWrapper = {
  flex: 1,
  minWidth: "250px"
};

const searchInp = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #e8dfd8",
  background: "#ffffff",
  fontSize: "14px",
  outline: "none",
  color: "#4a3728",
  boxSizing: "border-box"
};

const selectInp = {
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #e8dfd8",
  background: "#ffffff",
  fontSize: "14px",
  color: "#4a3728",
  outline: "none",
  cursor: "pointer"
};

const loadingState = {
  textAlign: "center",
  padding: "60px",
  color: "#8c7662"
};

const spinner = {
  width: "30px",
  height: "30px",
  border: "3px solid #f3e6df",
  borderTop: "3px solid #d97706",
  borderRadius: "50%",
  margin: "0 auto 16px auto",
  animation: "spin 1s linear infinite"
};

const errBox = {
  marginTop: 16,
  padding: "14px",
  borderRadius: "12px",
  background: "#fff1f1",
  border: "1px solid #fee2e2",
  color: "#b91c1c",
  fontSize: "14px",
  fontWeight: "500"
};