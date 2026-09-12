


import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://job-portal-applicant-tracking-system.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://job-portal-applicant-tracking-system.onrender.com/api/admin/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get("https://job-portal-applicant-tracking-system.onrender.com/api/admin/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) { console.log(err); }
  };

  const approveRecruiter = async (id) => {
    try {
      await axios.put(`https://job-portal-applicant-tracking-system.onrender.com/api/admin/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) { console.log(err); }
  };

  const blockRecruiter = async (id) => {
    try {
      await axios.put(`https://job-portal-applicant-tracking-system.onrender.com/api/admin/block/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    fetchUsers();
    fetchJobs();
    fetchApplications();
  }, []);

  const stats = [
    { label: "Total Users", value: users.length, icon: "👥", color: "#a78bfa" },
    { label: "Active Jobs", value: jobs.length, icon: "💼", color: "#34d399" },
    { label: "Applications", value: applications.length, icon: "📋", color: "#f472b6" },
    { label: "Recruiters", value: users.filter(u => u.role === "recruiter").length, icon: "🏢", color: "#fbbf24" },
  ];

  const navItems = [
    { id: "users", label: "Manage Users", icon: "👥" },
    { id: "jobs", label: "All Jobs", icon: "💼" },
    { id: "applications", label: "Applications", icon: "📋" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Syne', sans-serif", background: "#0a0a0f", color: "#f5f0eb", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.3); border-radius: 4px; }

        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; border-radius: 12px;
          cursor: pointer; transition: all 0.2s ease;
          border: none; background: transparent;
          color: rgba(245,240,235,0.45);
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 500;
          width: 100%; text-align: left;
        }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #f5f0eb; }
        .nav-item.active {
          background: rgba(167,139,250,0.12);
          color: #c4b5fd;
          border: 1px solid rgba(167,139,250,0.2);
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 24px 28px;
          transition: all 0.3s ease;
          position: relative; overflow: hidden;
        }
        .stat-card:hover {
          border-color: rgba(167,139,250,0.2);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .user-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        .user-card:hover {
          border-color: rgba(167,139,250,0.2);
          background: rgba(167,139,250,0.03);
        }

        .approve-btn {
          padding: 8px 18px; border: none; border-radius: 8px;
          background: rgba(52,211,153,0.15); color: #34d399;
          border: 1px solid rgba(52,211,153,0.25);
          font-family: 'Syne', sans-serif; font-size: 13px;
          font-weight: 600; cursor: pointer;
          transition: all 0.2s ease;
        }
        .approve-btn:hover { background: rgba(52,211,153,0.25); transform: translateY(-1px); }

        .block-btn {
          padding: 8px 18px; border: none; border-radius: 8px;
          background: rgba(248,113,113,0.12); color: #f87171;
          border: 1px solid rgba(248,113,113,0.2);
          font-family: 'Syne', sans-serif; font-size: 13px;
          font-weight: 600; cursor: pointer;
          transition: all 0.2s ease;
        }
        .block-btn:hover { background: rgba(248,113,113,0.22); transform: translateY(-1px); }

        .role-badge {
          display: inline-flex; align-items: center;
          padding: 4px 12px; border-radius: 100px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.5px; text-transform: uppercase;
        }

        .status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.4s ease both; }

        .orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }

        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px; font-weight: 400;
          color: #f5f0eb; margin-bottom: 6px;
        }
        .section-sub {
          font-size: 13px; color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
        }

        .tag-chip {
          display: inline-block; padding: 3px 10px;
          border-radius: 6px; font-size: 11px; font-weight: 600;
          background: rgba(167,139,250,0.1);
          color: #a78bfa; border: 1px solid rgba(167,139,250,0.15);
          margin: 2px;
        }
      `}</style>

      {/* Ambient orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.08)", top: -100, left: -100 }} />
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(244,114,182,0.05)", bottom: -100, right: 200 }} />

      {/* Sidebar */}
      <div style={{
        width: 240, background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column", padding: "28px 16px",
        position: "relative", zIndex: 10, flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 8px", marginBottom: "36px" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "10px",
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "15px", fontWeight: "800", color: "white", flexShrink: 0
          }}>J</div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#f5f0eb", lineHeight: 1 }}>JobPortal</div>
            <div style={{ fontSize: "10px", color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>Admin</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "600", padding: "0 8px", marginBottom: "8px" }}>Navigation</div>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Bottom profile */}
        <div style={{
          padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "12px"
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #a78bfa, #f472b6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "700", color: "white"
          }}>A</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#f5f0eb" }}>Admin</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Super User</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>
        {/* Top bar */}
        <div style={{
          padding: "24px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(10,10,15,0.7)", backdropFilter: "blur(20px)",
          position: "sticky", top: 0, zIndex: 10
        }}>
          <div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px", textTransform: "uppercase" }}>Admin Dashboard</div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", fontWeight: "400", color: "#f5f0eb", marginTop: "2px" }}>
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{
              padding: "8px 20px", borderRadius: "100px",
              background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)",
              fontSize: "13px", color: "#c4b5fd", fontWeight: "600"
            }}>
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          </div>
        </div>

        <div style={{ padding: "36px 40px" }}>

          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }}>
            {stats.map((s, i) => (
              <div className="stat-card fade-in" key={s.label} style={{ animationDelay: `${i * 0.07}s` }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, ${s.color}66, transparent)`
                }} />
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{s.icon}</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "36px", fontWeight: "400", color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "6px", fontWeight: "500" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ===== USERS TAB ===== */}
          {activeTab === "users" && (
            <div className="fade-in">
              <div className="section-title">All Users</div>
              <div className="section-sub">{users.length} total accounts registered</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {users.map((user) => (
                  <div className="user-card" key={user._id}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: "50%",
                          background: user.role === "admin" ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                            : user.role === "recruiter" ? "linear-gradient(135deg, #34d399, #059669)"
                              : "linear-gradient(135deg, #a78bfa, #7c3aed)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "16px", fontWeight: "700", color: "white"
                        }}>{user.name?.charAt(0)?.toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: "700", fontSize: "15px", color: "#f5f0eb" }}>{user.name}</div>
                          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{user.email}</div>
                        </div>
                      </div>
                      <span className="role-badge" style={{
                        background: user.role === "admin" ? "rgba(251,191,36,0.12)" : user.role === "recruiter" ? "rgba(52,211,153,0.12)" : "rgba(167,139,250,0.12)",
                        color: user.role === "admin" ? "#fbbf24" : user.role === "recruiter" ? "#34d399" : "#a78bfa",
                        border: `1px solid ${user.role === "admin" ? "rgba(251,191,36,0.2)" : user.role === "recruiter" ? "rgba(52,211,153,0.2)" : "rgba(167,139,250,0.2)"}`
                      }}>{user.role}</span>
                    </div>

                    {user.role === "recruiter" && (
                      <>
                        <div style={{ marginBottom: "16px" }}>
                          <span className={`status-badge`} style={{
                            background: user.approved ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                            border: `1px solid ${user.approved ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`,
                            color: user.approved ? "#34d399" : "#f87171"
                          }}>
                            <span className="status-dot" style={{ background: user.approved ? "#34d399" : "#f87171" }} />
                            {user.approved ? "Approved" : "Blocked"}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button className="approve-btn" onClick={() => approveRecruiter(user._id)}>✓ Approve</button>
                          <button className="block-btn" onClick={() => blockRecruiter(user._id)}>✕ Block</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== JOBS TAB ===== */}
          {activeTab === "jobs" && (
            <div className="fade-in">
              <div className="section-title">All Job Listings</div>
              <div className="section-sub">{jobs.length} jobs posted across the platform</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
                {jobs.map((job) => (
                  <div className="user-card" key={job._id}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "12px",
                        background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(5,150,105,0.15))",
                        border: "1px solid rgba(52,211,153,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
                      }}>💼</div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "16px", color: "#f5f0eb" }}>{job.title}</div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{job.company}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "4px" }}>
                        📍 {job.location}
                      </span>
                    </div>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                        Posted by <span style={{ color: "#a78bfa", fontWeight: "600" }}>{job.recruiter?.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== APPLICATIONS TAB ===== */}
          {activeTab === "applications" && (
            <div className="fade-in">
              <div className="section-title">All Applications</div>
              <div className="section-sub">{applications.length} applications submitted</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {applications.map((app) => {
                  const statusColors = {
                    Selected: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)", color: "#34d399" },
                    Rejected: { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)", color: "#f87171" },
                    Shortlisted: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)", color: "#60a5fa" },
                    Pending: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
                  };
                  const sc = statusColors[app.status] || statusColors.Pending;
                  return (
                    <div className="user-card" key={app._id} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "50%",
                        background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px", fontWeight: "700", color: "white", flexShrink: 0
                      }}>{app.candidate?.name?.charAt(0)?.toUpperCase()}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "700", fontSize: "15px", color: "#f5f0eb" }}>{app.candidate?.name}</div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
                          Applied for <span style={{ color: "#c4b5fd" }}>{app.job?.title}</span> at <span style={{ color: "rgba(255,255,255,0.5)" }}>{app.job?.company}</span>
                        </div>
                      </div>
                      <span className="status-badge" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color, flexShrink: 0 }}>
                        <span className="status-dot" style={{ background: sc.color }} />
                        {app.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;