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

  const [status, setStatus] = useState(""); // filter
  const [search, setSearch] = useState(""); // search input
  const [searchLive, setSearchLive] = useState(""); // debounced value

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // debounce search
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // reset to page 1 when filters change
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
    <div style={{ padding: 16, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ marginTop: 0 }}>Dashboard</h2>

      <StatsCards stats={stats} />

      <div style={toolbar}>
        <button onClick={openCreate} style={primaryBtn}>+ Add Job</button>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company / role..."
            style={inp}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)} style={inp}>
            <option value="">All status</option>
            <option value="applied">applied</option>
            <option value="interview">interview</option>
            <option value="offer">offer</option>
            <option value="rejected">rejected</option>
          </select>

          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} style={inp}>
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>

      {err && <div style={errBox}>{err}</div>}
      {loading ? (
        <div style={{ marginTop: 12 }}>Loading...</div>
      ) : (
        <>
          <JobTable
            jobs={jobs}
            onEdit={openEdit}
            onDelete={deleteJob}
            onQuickStatus={quickStatus}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
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

const toolbar = {
  marginTop: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #111",
  background: "#111",
  color: "white",
  cursor: "pointer",
};

const inp = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
};

const errBox = {
  marginTop: 12,
  padding: 10,
  borderRadius: 10,
  background: "#fff0f0",
  border: "1px solid #f2c0c0",
  fontSize: 14,
};
