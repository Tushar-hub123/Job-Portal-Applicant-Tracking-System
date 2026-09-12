


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [activeTab, setActiveTab] = useState("users");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const token = localStorage.getItem("token");

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("https://job-portal-applicant-tracking-system.onrender.com/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) { console.log(err); }
//   };

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("https://job-portal-applicant-tracking-system.onrender.com/api/admin/jobs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setJobs(res.data);
//     } catch (err) { console.log(err); }
//   };

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("https://job-portal-applicant-tracking-system.onrender.com/api/admin/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data);
//     } catch (err) { console.log(err); }
//   };

//   const approveRecruiter = async (id) => {
//     try {
//       await axios.put(`https://job-portal-applicant-tracking-system.onrender.com/api/admin/approve/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchUsers();
//     } catch (err) { console.log(err); }
//   };

//   const blockRecruiter = async (id) => {
//     try {
//       await axios.put(`https://job-portal-applicant-tracking-system.onrender.com/api/admin/block/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchUsers();
//     } catch (err) { console.log(err); }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchJobs();
//     fetchApplications();
//   }, []);

//   const stats = [
//     { label: "Total Users", value: users.length, icon: "👥", color: "#a78bfa" },
//     { label: "Active Jobs", value: jobs.length, icon: "💼", color: "#34d399" },
//     { label: "Applications", value: applications.length, icon: "📋", color: "#f472b6" },
//     { label: "Recruiters", value: users.filter(u => u.role === "recruiter").length, icon: "🏢", color: "#fbbf24" },
//   ];

//   const navItems = [
//     { id: "users", label: "Manage Users", icon: "👥" },
//     { id: "jobs", label: "All Jobs", icon: "💼" },
//     { id: "applications", label: "Applications", icon: "📋" },
//   ];

//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "'Syne', sans-serif", background: "#0a0a0f", color: "#f5f0eb", overflow: "hidden" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.3); border-radius: 4px; }

//         .nav-item {
//           display: flex; align-items: center; gap: 12px;
//           padding: 12px 16px; border-radius: 12px;
//           cursor: pointer; transition: all 0.2s ease;
//           border: none; background: transparent;
//           color: rgba(245,240,235,0.45);
//           font-family: 'Syne', sans-serif;
//           font-size: 14px; font-weight: 500;
//           width: 100%; text-align: left;
//         }
//         .nav-item:hover { background: rgba(255,255,255,0.05); color: #f5f0eb; }
//         .nav-item.active {
//           background: rgba(167,139,250,0.12);
//           color: #c4b5fd;
//           border: 1px solid rgba(167,139,250,0.2);
//         }

//         .stat-card {
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.07);
//           border-radius: 20px;
//           padding: 24px 28px;
//           transition: all 0.3s ease;
//           position: relative; overflow: hidden;
//         }
//         .stat-card:hover {
//           border-color: rgba(167,139,250,0.2);
//           transform: translateY(-2px);
//           box-shadow: 0 20px 40px rgba(0,0,0,0.3);
//         }

//         .user-card {
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.07);
//           border-radius: 18px;
//           padding: 24px;
//           transition: all 0.3s ease;
//         }
//         .user-card:hover {
//           border-color: rgba(167,139,250,0.2);
//           background: rgba(167,139,250,0.03);
//         }

//         .approve-btn {
//           padding: 8px 18px; border: none; border-radius: 8px;
//           background: rgba(52,211,153,0.15); color: #34d399;
//           border: 1px solid rgba(52,211,153,0.25);
//           font-family: 'Syne', sans-serif; font-size: 13px;
//           font-weight: 600; cursor: pointer;
//           transition: all 0.2s ease;
//         }
//         .approve-btn:hover { background: rgba(52,211,153,0.25); transform: translateY(-1px); }

//         .block-btn {
//           padding: 8px 18px; border: none; border-radius: 8px;
//           background: rgba(248,113,113,0.12); color: #f87171;
//           border: 1px solid rgba(248,113,113,0.2);
//           font-family: 'Syne', sans-serif; font-size: 13px;
//           font-weight: 600; cursor: pointer;
//           transition: all 0.2s ease;
//         }
//         .block-btn:hover { background: rgba(248,113,113,0.22); transform: translateY(-1px); }

//         .role-badge {
//           display: inline-flex; align-items: center;
//           padding: 4px 12px; border-radius: 100px;
//           font-size: 11px; font-weight: 700;
//           letter-spacing: 0.5px; text-transform: uppercase;
//         }

//         .status-badge {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 4px 12px; border-radius: 100px;
//           font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
//         }
//         .status-dot { width: 6px; height: 6px; border-radius: 50%; }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .fade-in { animation: fadeIn 0.4s ease both; }

//         .orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }

//         .section-title {
//           font-family: 'DM Serif Display', serif;
//           font-size: 28px; font-weight: 400;
//           color: #f5f0eb; margin-bottom: 6px;
//         }
//         .section-sub {
//           font-size: 13px; color: rgba(255,255,255,0.35);
//           margin-bottom: 28px;
//         }

//         .tag-chip {
//           display: inline-block; padding: 3px 10px;
//           border-radius: 6px; font-size: 11px; font-weight: 600;
//           background: rgba(167,139,250,0.1);
//           color: #a78bfa; border: 1px solid rgba(167,139,250,0.15);
//           margin: 2px;
//         }
//       `}</style>

//       {/* Ambient orbs */}
//       <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.08)", top: -100, left: -100 }} />
//       <div className="orb" style={{ width: 400, height: 400, background: "rgba(244,114,182,0.05)", bottom: -100, right: 200 }} />

//       {/* Sidebar */}
//       <div style={{
//         width: 240, background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)",
//         display: "flex", flexDirection: "column", padding: "28px 16px",
//         position: "relative", zIndex: 10, flexShrink: 0
//       }}>
//         {/* Logo */}
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 8px", marginBottom: "36px" }}>
//           <div style={{
//             width: 34, height: 34, borderRadius: "10px",
//             background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontSize: "15px", fontWeight: "800", color: "white", flexShrink: 0
//           }}>J</div>
//           <div>
//             <div style={{ fontSize: "16px", fontWeight: "700", color: "#f5f0eb", lineHeight: 1 }}>JobPortal</div>
//             <div style={{ fontSize: "10px", color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>Admin</div>
//           </div>
//         </div>

//         {/* Nav */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
//           <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "600", padding: "0 8px", marginBottom: "8px" }}>Navigation</div>
//           {navItems.map(item => (
//             <button key={item.id} className={`nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
//               <span style={{ fontSize: "16px" }}>{item.icon}</span>
//               {item.label}
//             </button>
//           ))}
//         </div>

//         {/* Bottom profile */}
//         <div style={{
//           padding: "16px", borderRadius: "14px", background: "rgba(255,255,255,0.03)",
//           border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "12px"
//         }}>
//           <div style={{
//             width: 36, height: 36, borderRadius: "50%",
//             background: "linear-gradient(135deg, #a78bfa, #f472b6)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontSize: "14px", fontWeight: "700", color: "white"
//           }}>A</div>
//           <div>
//             <div style={{ fontSize: "13px", fontWeight: "600", color: "#f5f0eb" }}>Admin</div>
//             <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Super User</div>
//           </div>
//         </div>
//       </div>

//       {/* Main */}
//       <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>
//         {/* Top bar */}
//         <div style={{
//           padding: "24px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)",
//           display: "flex", justifyContent: "space-between", alignItems: "center",
//           background: "rgba(10,10,15,0.7)", backdropFilter: "blur(20px)",
//           position: "sticky", top: 0, zIndex: 10
//         }}>
//           <div>
//             <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px", textTransform: "uppercase" }}>Admin Dashboard</div>
//             <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", fontWeight: "400", color: "#f5f0eb", marginTop: "2px" }}>
//               {navItems.find(n => n.id === activeTab)?.label}
//             </h1>
//           </div>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <div style={{
//               padding: "8px 20px", borderRadius: "100px",
//               background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)",
//               fontSize: "13px", color: "#c4b5fd", fontWeight: "600"
//             }}>
//               {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//             </div>
//           </div>
//         </div>

//         <div style={{ padding: "36px 40px" }}>

//           {/* Stats Row */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }}>
//             {stats.map((s, i) => (
//               <div className="stat-card fade-in" key={s.label} style={{ animationDelay: `${i * 0.07}s` }}>
//                 <div style={{
//                   position: "absolute", top: 0, left: 0, right: 0, height: "2px",
//                   background: `linear-gradient(90deg, ${s.color}66, transparent)`
//                 }} />
//                 <div style={{ fontSize: "28px", marginBottom: "10px" }}>{s.icon}</div>
//                 <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "36px", fontWeight: "400", color: s.color, lineHeight: 1 }}>{s.value}</div>
//                 <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "6px", fontWeight: "500" }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* ===== USERS TAB ===== */}
//           {activeTab === "users" && (
//             <div className="fade-in">
//               <div className="section-title">All Users</div>
//               <div className="section-sub">{users.length} total accounts registered</div>
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
//                 {users.map((user) => (
//                   <div className="user-card" key={user._id}>
//                     <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
//                       <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                         <div style={{
//                           width: 42, height: 42, borderRadius: "50%",
//                           background: user.role === "admin" ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
//                             : user.role === "recruiter" ? "linear-gradient(135deg, #34d399, #059669)"
//                               : "linear-gradient(135deg, #a78bfa, #7c3aed)",
//                           display: "flex", alignItems: "center", justifyContent: "center",
//                           fontSize: "16px", fontWeight: "700", color: "white"
//                         }}>{user.name?.charAt(0)?.toUpperCase()}</div>
//                         <div>
//                           <div style={{ fontWeight: "700", fontSize: "15px", color: "#f5f0eb" }}>{user.name}</div>
//                           <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{user.email}</div>
//                         </div>
//                       </div>
//                       <span className="role-badge" style={{
//                         background: user.role === "admin" ? "rgba(251,191,36,0.12)" : user.role === "recruiter" ? "rgba(52,211,153,0.12)" : "rgba(167,139,250,0.12)",
//                         color: user.role === "admin" ? "#fbbf24" : user.role === "recruiter" ? "#34d399" : "#a78bfa",
//                         border: `1px solid ${user.role === "admin" ? "rgba(251,191,36,0.2)" : user.role === "recruiter" ? "rgba(52,211,153,0.2)" : "rgba(167,139,250,0.2)"}`
//                       }}>{user.role}</span>
//                     </div>

//                     {user.role === "recruiter" && (
//                       <>
//                         <div style={{ marginBottom: "16px" }}>
//                           <span className={`status-badge`} style={{
//                             background: user.approved ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
//                             border: `1px solid ${user.approved ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`,
//                             color: user.approved ? "#34d399" : "#f87171"
//                           }}>
//                             <span className="status-dot" style={{ background: user.approved ? "#34d399" : "#f87171" }} />
//                             {user.approved ? "Approved" : "Blocked"}
//                           </span>
//                         </div>
//                         <div style={{ display: "flex", gap: "8px" }}>
//                           <button className="approve-btn" onClick={() => approveRecruiter(user._id)}>✓ Approve</button>
//                           <button className="block-btn" onClick={() => blockRecruiter(user._id)}>✕ Block</button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ===== JOBS TAB ===== */}
//           {activeTab === "jobs" && (
//             <div className="fade-in">
//               <div className="section-title">All Job Listings</div>
//               <div className="section-sub">{jobs.length} jobs posted across the platform</div>
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
//                 {jobs.map((job) => (
//                   <div className="user-card" key={job._id}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
//                       <div style={{
//                         width: 44, height: 44, borderRadius: "12px",
//                         background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(5,150,105,0.15))",
//                         border: "1px solid rgba(52,211,153,0.15)",
//                         display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
//                       }}>💼</div>
//                       <div>
//                         <div style={{ fontWeight: "700", fontSize: "16px", color: "#f5f0eb" }}>{job.title}</div>
//                         <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{job.company}</div>
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
//                       <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "4px" }}>
//                         📍 {job.location}
//                       </span>
//                     </div>
//                     <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                       <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
//                         Posted by <span style={{ color: "#a78bfa", fontWeight: "600" }}>{job.recruiter?.name}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ===== APPLICATIONS TAB ===== */}
//           {activeTab === "applications" && (
//             <div className="fade-in">
//               <div className="section-title">All Applications</div>
//               <div className="section-sub">{applications.length} applications submitted</div>
//               <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//                 {applications.map((app) => {
//                   const statusColors = {
//                     Selected: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)", color: "#34d399" },
//                     Rejected: { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)", color: "#f87171" },
//                     Shortlisted: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)", color: "#60a5fa" },
//                     Pending: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
//                   };
//                   const sc = statusColors[app.status] || statusColors.Pending;
//                   return (
//                     <div className="user-card" key={app._id} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//                       <div style={{
//                         width: 44, height: 44, borderRadius: "50%",
//                         background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         fontSize: "16px", fontWeight: "700", color: "white", flexShrink: 0
//                       }}>{app.candidate?.name?.charAt(0)?.toUpperCase()}</div>
//                       <div style={{ flex: 1 }}>
//                         <div style={{ fontWeight: "700", fontSize: "15px", color: "#f5f0eb" }}>{app.candidate?.name}</div>
//                         <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
//                           Applied for <span style={{ color: "#c4b5fd" }}>{app.job?.title}</span> at <span style={{ color: "rgba(255,255,255,0.5)" }}>{app.job?.company}</span>
//                         </div>
//                       </div>
//                       <span className="status-badge" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color, flexShrink: 0 }}>
//                         <span className="status-dot" style={{ background: sc.color }} />
//                         {app.status}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




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
      const res = await axios.get(
        "https://job-portal-applicant-tracking-system.onrender.com/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-applicant-tracking-system.onrender.com/api/admin/jobs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-applicant-tracking-system.onrender.com/api/admin/applications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveRecruiter = async (id) => {
    try {
      await axios.put(
        `https://job-portal-applicant-tracking-system.onrender.com/api/admin/approve/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const blockRecruiter = async (id) => {
    try {
      await axios.put(
        `https://job-portal-applicant-tracking-system.onrender.com/api/admin/block/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchJobs();
    fetchApplications();
  }, []);

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: "👥",
      color: "#a78bfa",
    },
    {
      label: "Active Jobs",
      value: jobs.length,
      icon: "💼",
      color: "#34d399",
    },
    {
      label: "Applications",
      value: applications.length,
      icon: "📋",
      color: "#f472b6",
    },
    {
      label: "Recruiters",
      value: users.filter((u) => u.role === "recruiter").length,
      icon: "🏢",
      color: "#fbbf24",
    },
  ];

  const navItems = [
    { id: "users", label: "Manage Users", icon: "👥" },
    { id: "jobs", label: "All Jobs", icon: "💼" },
    { id: "applications", label: "Applications", icon: "📋" },
  ];

  return (
    <div
      className="admin-dashboard"
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Syne', sans-serif",
        background: "#0a0a0f",
        color: "#f5f0eb",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(167,139,250,0.3);
          border-radius: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          background: transparent;
          color: rgba(245,240,235,0.45);
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 500;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: #f5f0eb;
        }

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
          position: relative;
          overflow: hidden;
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
          min-width: 0;
        }

        .user-card:hover {
          border-color: rgba(167,139,250,0.2);
          background: rgba(167,139,250,0.03);
        }

        .approve-btn {
          padding: 8px 18px;
          border: none;
          border-radius: 8px;
          background: rgba(52,211,153,0.15);
          color: #34d399;
          border: 1px solid rgba(52,211,153,0.25);
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .approve-btn:hover {
          background: rgba(52,211,153,0.25);
          transform: translateY(-1px);
        }

        .block-btn {
          padding: 8px 18px;
          border: none;
          border-radius: 8px;
          background: rgba(248,113,113,0.12);
          color: #f87171;
          border: 1px solid rgba(248,113,113,0.2);
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .block-btn:hover {
          background: rgba(248,113,113,0.22);
          transform: translateY(-1px);
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.4s ease both;
        }

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }

        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          font-weight: 400;
          color: #f5f0eb;
          margin-bottom: 6px;
        }

        .section-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
        }

        .tag-chip {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(167,139,250,0.1);
          color: #a78bfa;
          border: 1px solid rgba(167,139,250,0.15);
          margin: 2px;
        }

        /* =============================== */
        /* RESPONSIVENESS ONLY              */
        /* =============================== */

        /* Smaller laptops */
        @media (max-width: 1100px) {
          .admin-sidebar {
            width: 210px !important;
          }

          .admin-main-content {
            padding-left: 30px !important;
            padding-right: 30px !important;
          }

          .admin-topbar {
            padding-left: 30px !important;
            padding-right: 30px !important;
          }

          .admin-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Tablets */
        @media (max-width: 850px) {
          .admin-dashboard {
            flex-direction: column !important;
            height: 100vh !important;
            overflow: hidden !important;
          }

          .admin-sidebar {
            width: 100% !important;
            height: auto !important;
            min-height: auto !important;
            flex-shrink: 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
            padding: 16px !important;
          }

          .admin-logo {
            margin-bottom: 16px !important;
          }

          .admin-nav {
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 6px !important;
            padding-bottom: 3px !important;
          }

          .admin-nav-label {
            display: none !important;
          }

          .admin-nav .nav-item {
            width: auto !important;
            min-width: max-content !important;
            white-space: nowrap !important;
          }

          .admin-profile {
            display: none !important;
          }

          .admin-main {
            width: 100% !important;
            min-height: 0 !important;
            flex: 1 !important;
          }

          .admin-topbar {
            padding: 18px 24px !important;
          }

          .admin-main-content {
            padding: 28px 24px !important;
          }

          .admin-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }

          .stat-card {
            padding: 20px !important;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .admin-sidebar {
            padding: 12px !important;
          }

          .admin-logo {
            padding: 4px !important;
            margin-bottom: 12px !important;
          }

          .admin-nav {
            width: 100% !important;
          }

          .admin-nav .nav-item {
            padding: 10px 12px !important;
            font-size: 12px !important;
            gap: 7px !important;
          }

          .admin-topbar {
            padding: 16px 18px !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }

          .admin-topbar-title {
            font-size: 20px !important;
          }

          .admin-date {
            padding: 7px 11px !important;
            font-size: 11px !important;
            white-space: nowrap !important;
          }

          .admin-main-content {
            padding: 22px 16px !important;
          }

          .admin-stats {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
            margin-bottom: 30px !important;
          }

          .stat-card {
            padding: 17px !important;
            border-radius: 16px !important;
          }

          .stat-card > div:nth-child(2) {
            font-size: 23px !important;
          }

          .section-title {
            font-size: 25px !important;
          }

          .section-sub {
            font-size: 12px !important;
            margin-bottom: 20px !important;
          }

          .users-grid,
          .jobs-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .user-card {
            padding: 18px !important;
            border-radius: 16px !important;
          }

          .user-card > div:first-child {
            gap: 8px !important;
          }

          .role-badge {
            padding: 4px 8px !important;
            font-size: 9px !important;
          }

          .approve-btn,
          .block-btn {
            flex: 1 !important;
            padding: 8px 10px !important;
            font-size: 12px !important;
          }

          .application-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }

          .application-card .status-badge {
            align-self: flex-start !important;
          }
        }

        /* Small phones */
        @media (max-width: 420px) {
          .admin-topbar {
            padding: 14px 14px !important;
          }

          .admin-main-content {
            padding: 18px 12px !important;
          }

          .admin-topbar-title {
            font-size: 18px !important;
          }

          .admin-topbar-subtitle {
            font-size: 10px !important;
          }

          .admin-date {
            font-size: 10px !important;
            padding: 6px 8px !important;
          }

          .admin-stats {
            grid-template-columns: 1fr !important;
          }

          .stat-card {
            display: grid !important;
            grid-template-columns: auto 1fr !important;
            column-gap: 14px !important;
            align-items: center !important;
          }

          .stat-card > div:nth-child(2) {
            grid-column: 2 !important;
            grid-row: 1 !important;
            font-size: 28px !important;
          }

          .stat-card > div:nth-child(3) {
            grid-column: 2 !important;
            grid-row: 2 !important;
            margin-top: 2px !important;
          }

          .stat-card > div:first-of-type {
            grid-column: 1 !important;
            grid-row: 1 / 3 !important;
            position: static !important;
            height: auto !important;
          }

          .section-title {
            font-size: 23px !important;
          }

          .user-card {
            padding: 15px !important;
          }

          .user-card > div:first-child {
            flex-wrap: wrap !important;
          }

          .user-card > div:first-child > div:first-child {
            min-width: 0 !important;
            flex: 1 !important;
          }

          .user-card > div:first-child > div:first-child > div:last-child {
            min-width: 0 !important;
          }

          .user-card > div:first-child > div:first-child > div:last-child > div:first-child {
            overflow-wrap: anywhere !important;
          }

          .user-card > div:first-child > div:first-child > div:last-child > div:last-child {
            overflow-wrap: anywhere !important;
          }

          .application-card {
            padding: 15px !important;
          }
        }

        /* Very small phones */
        @media (max-width: 350px) {
          .admin-sidebar {
            padding: 10px !important;
          }

          .admin-logo div:last-child {
            display: none !important;
          }

          .admin-nav .nav-item {
            padding: 9px 10px !important;
            font-size: 11px !important;
          }

          .admin-topbar {
            flex-direction: column !important;
          }

          .admin-date {
            align-self: flex-start !important;
          }

          .admin-main-content {
            padding: 16px 10px !important;
          }

          .stat-card {
            padding: 15px !important;
          }

          .approve-btn,
          .block-btn {
            font-size: 11px !important;
            padding: 7px 8px !important;
          }
        }
      `}</style>

      {/* Ambient orbs */}
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          background: "rgba(124,58,237,0.08)",
          top: -100,
          left: -100,
        }}
      />

      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          background: "rgba(244,114,182,0.05)",
          bottom: -100,
          right: 200,
        }}
      />

      {/* Sidebar */}
      <div
        className="admin-sidebar"
        style={{
          width: 240,
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "28px 16px",
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          className="admin-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "4px 8px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, #a78bfa, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: "800",
              color: "white",
              flexShrink: 0,
            }}
          >
            J
          </div>

          <div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#f5f0eb",
                lineHeight: 1,
              }}
            >
              JobPortal
            </div>

            <div
              style={{
                fontSize: "10px",
                color: "#a78bfa",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Admin
            </div>
          </div>
        </div>

        {/* Nav */}
        <div
          className="admin-nav"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1,
          }}
        >
          <div
            className="admin-nav-label"
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: "600",
              padding: "0 8px",
              marginBottom: "8px",
            }}
          >
            Navigation
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activeTab === item.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={{ fontSize: "16px" }}>
                {item.icon}
              </span>

              {item.label}
            </button>
          ))}
        </div>

        {/* Bottom profile */}
        <div
          className="admin-profile"
          style={{
            padding: "16px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #a78bfa, #f472b6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "700",
              color: "white",
            }}
          >
            A
          </div>

          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#f5f0eb",
              }}
            >
              Admin
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Super User
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        className="admin-main"
        style={{
          flex: 1,
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
          minWidth: 0,
        }}
      >
        {/* Top bar */}
        <div
          className="admin-topbar"
          style={{
            padding: "24px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(10,10,15,0.7)",
            backdropFilter: "blur(20px)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <div
              className="admin-topbar-subtitle"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Admin Dashboard
            </div>

            <h1
              className="admin-topbar-title"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "24px",
                fontWeight: "400",
                color: "#f5f0eb",
                marginTop: "2px",
              }}
            >
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <div
              className="admin-date"
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                background: "rgba(167,139,250,0.1)",
                border:
                  "1px solid rgba(167,139,250,0.2)",
                fontSize: "13px",
                color: "#c4b5fd",
                fontWeight: "600",
              }}
            >
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        <div
          className="admin-main-content"
          style={{
            padding: "36px 40px",
          }}
        >
          {/* Stats Row */}
          <div
            className="admin-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            {stats.map((s, i) => (
              <div
                className="stat-card fade-in"
                key={s.label}
                style={{
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${s.color}66, transparent)`,
                  }}
                />

                <div
                  style={{
                    fontSize: "28px",
                    marginBottom: "10px",
                  }}
                >
                  {s.icon}
                </div>

                <div
                  style={{
                    fontFamily:
                      "'DM Serif Display', serif",
                    fontSize: "36px",
                    fontWeight: "400",
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.35)",
                    marginTop: "6px",
                    fontWeight: "500",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ===== USERS TAB ===== */}
          {activeTab === "users" && (
            <div className="fade-in">
              <div className="section-title">
                All Users
              </div>

              <div className="section-sub">
                {users.length} total accounts registered
              </div>

              <div
                className="users-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "16px",
                }}
              >
                {users.map((user) => (
                  <div
                    className="user-card"
                    key={user._id}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            background:
                              user.role === "admin"
                                ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                                : user.role === "recruiter"
                                ? "linear-gradient(135deg, #34d399, #059669)"
                                : "linear-gradient(135deg, #a78bfa, #7c3aed)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "white",
                            flexShrink: 0,
                          }}
                        >
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div
                          style={{
                            minWidth: 0,
                          }}
                        >
                          <div
                            style={{
                              fontWeight: "700",
                              fontSize: "15px",
                              color: "#f5f0eb",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {user.name}
                          </div>

                          <div
                            style={{
                              fontSize: "12px",
                              color:
                                "rgba(255,255,255,0.3)",
                              marginTop: "2px",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {user.email}
                          </div>
                        </div>
                      </div>

                      <span
                        className="role-badge"
                        style={{
                          background:
                            user.role === "admin"
                              ? "rgba(251,191,36,0.12)"
                              : user.role === "recruiter"
                              ? "rgba(52,211,153,0.12)"
                              : "rgba(167,139,250,0.12)",
                          color:
                            user.role === "admin"
                              ? "#fbbf24"
                              : user.role === "recruiter"
                              ? "#34d399"
                              : "#a78bfa",
                          border: `1px solid ${
                            user.role === "admin"
                              ? "rgba(251,191,36,0.2)"
                              : user.role === "recruiter"
                              ? "rgba(52,211,153,0.2)"
                              : "rgba(167,139,250,0.2)"
                          }`,
                        }}
                      >
                        {user.role}
                      </span>
                    </div>

                    {user.role === "recruiter" && (
                      <>
                        <div
                          style={{
                            marginBottom: "16px",
                          }}
                        >
                          <span
                            className="status-badge"
                            style={{
                              background: user.approved
                                ? "rgba(52,211,153,0.1)"
                                : "rgba(248,113,113,0.1)",
                              border: `1px solid ${
                                user.approved
                                  ? "rgba(52,211,153,0.2)"
                                  : "rgba(248,113,113,0.2)"
                              }`,
                              color: user.approved
                                ? "#34d399"
                                : "#f87171",
                            }}
                          >
                            <span
                              className="status-dot"
                              style={{
                                background: user.approved
                                  ? "#34d399"
                                  : "#f87171",
                              }}
                            />

                            {user.approved
                              ? "Approved"
                              : "Blocked"}
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <button
                            className="approve-btn"
                            onClick={() =>
                              approveRecruiter(
                                user._id
                              )
                            }
                          >
                            ✓ Approve
                          </button>

                          <button
                            className="block-btn"
                            onClick={() =>
                              blockRecruiter(
                                user._id
                              )
                            }
                          >
                            ✕ Block
                          </button>
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
              <div className="section-title">
                All Job Listings
              </div>

              <div className="section-sub">
                {jobs.length} jobs posted across the platform
              </div>

              <div
                className="jobs-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "16px",
                }}
              >
                {jobs.map((job) => (
                  <div
                    className="user-card"
                    key={job._id}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(5,150,105,0.15))",
                          border:
                            "1px solid rgba(52,211,153,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          flexShrink: 0,
                        }}
                      >
                        💼
                      </div>

                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "700",
                            fontSize: "16px",
                            color: "#f5f0eb",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {job.title}
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            color:
                              "rgba(255,255,255,0.4)",
                            marginTop: "2px",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {job.company}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "14px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color:
                            "rgba(255,255,255,0.4)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          overflowWrap: "anywhere",
                        }}
                      >
                        📍 {job.location}
                      </span>
                    </div>

                    <div
                      style={{
                        borderTop:
                          "1px solid rgba(255,255,255,0.06)",
                        paddingTop: "14px",
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color:
                            "rgba(255,255,255,0.3)",
                          overflowWrap: "anywhere",
                        }}
                      >
                        Posted by{" "}
                        <span
                          style={{
                            color: "#a78bfa",
                            fontWeight: "600",
                          }}
                        >
                          {job.recruiter?.name}
                        </span>
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
              <div className="section-title">
                All Applications
              </div>

              <div className="section-sub">
                {applications.length} applications submitted
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {applications.map((app) => {
                  const statusColors = {
                    Selected: {
                      bg: "rgba(52,211,153,0.1)",
                      border:
                        "rgba(52,211,153,0.2)",
                      color: "#34d399",
                    },
                    Rejected: {
                      bg: "rgba(248,113,113,0.1)",
                      border:
                        "rgba(248,113,113,0.2)",
                      color: "#f87171",
                    },
                    Shortlisted: {
                      bg: "rgba(96,165,250,0.1)",
                      border:
                        "rgba(96,165,250,0.2)",
                      color: "#60a5fa",
                    },
                    Pending: {
                      bg: "rgba(251,191,36,0.1)",
                      border:
                        "rgba(251,191,36,0.2)",
                      color: "#fbbf24",
                    },
                  };

                  const sc =
                    statusColors[app.status] ||
                    statusColors.Pending;

                  return (
                    <div
                      className="user-card application-card"
                      key={app._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #a78bfa, #7c3aed)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "white",
                          flexShrink: 0,
                        }}
                      >
                        {app.candidate?.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "700",
                            fontSize: "15px",
                            color: "#f5f0eb",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {app.candidate?.name}
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            color:
                              "rgba(255,255,255,0.35)",
                            marginTop: "2px",
                            overflowWrap: "anywhere",
                          }}
                        >
                          Applied for{" "}
                          <span
                            style={{
                              color: "#c4b5fd",
                            }}
                          >
                            {app.job?.title}
                          </span>{" "}
                          at{" "}
                          <span
                            style={{
                              color:
                                "rgba(255,255,255,0.5)",
                            }}
                          >
                            {app.job?.company}
                          </span>
                        </div>
                      </div>

                      <span
                        className="status-badge"
                        style={{
                          background: sc.bg,
                          border: `1px solid ${sc.border}`,
                          color: sc.color,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          className="status-dot"
                          style={{
                            background: sc.color,
                          }}
                        />

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