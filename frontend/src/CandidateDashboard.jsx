
// import { useEffect, useState } from "react";
// import axios from "axios";

// function CandidateDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [resume, setResume] = useState(null);
//   const [username, setUsername] = useState("");
//   const [active, setActive] = useState("jobs");
//   const [applyingId, setApplyingId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchJobs();
//     fetchApplications();
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     if (user?.name) setUsername(user.name);
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("https://job-portal-applicant-tracking-system.onrender.com/api/jobs");
//       setJobs(res.data);
//     } catch (err) { console.log(err); }
//   };

//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get("https://job-portal-applicant-tracking-system.onrender.com/api/applications/my-applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setApplications(res.data);
//     } catch (err) { console.log(err); }
//   };

//   const applyJob = async (jobId) => {
//     if (!resume) {
//       alert("Upload resume first");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     const formData = new FormData();
//     formData.append("jobId", jobId);
//     formData.append("resume", resume);

//     setApplyingId(jobId);

//     try {
//       await axios.post(
//         "https://job-portal-applicant-tracking-system.onrender.com/api/applications/apply",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       fetchApplications();

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setApplyingId(null);
//     }
//   };

//   const hasApplied = (jobId) => applications.some(app => app.job?._id === jobId);

//   const filteredJobs = jobs.filter(job =>
//     job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     job.location?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const navItems = [
//     { id: "jobs", label: "Browse Jobs", icon: "🔍", count: jobs.length },
//     { id: "applications", label: "My Applications", icon: "📋", count: applications.length },
//   ];

//   const statusColors = {
//     Selected: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)", color: "#34d399" },
//     Rejected: { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)", color: "#f87171" },
//     Shortlisted: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)", color: "#60a5fa" },
//     "Not Selected": { bg: "rgba(156,163,175,0.1)", border: "rgba(156,163,175,0.2)", color: "#9ca3af" },
//     Pending: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "'Syne', sans-serif", background: "#0a0a0f", color: "#f5f0eb", overflow: "hidden" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
//         * { box-sizing: border-box; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.3); border-radius: 4px; }

//         .nav-item {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 12px 16px; border-radius: 12px;
//           cursor: pointer; transition: all 0.2s ease;
//           border: none; background: transparent;
//           color: rgba(245,240,235,0.45);
//           font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 500;
//           width: 100%; text-align: left;
//         }
//         .nav-item:hover { background: rgba(255,255,255,0.05); color: #f5f0eb; }
//         .nav-item.active { background: rgba(167,139,250,0.12); color: #c4b5fd; border: 1px solid rgba(167,139,250,0.2); }

//         .job-card {
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.07);
//           border-radius: 20px; padding: 28px;
//           transition: all 0.3s ease; position: relative; overflow: hidden;
//         }
//         .job-card:hover { border-color: rgba(167,139,250,0.2); transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

//         .apply-btn {
//           width: 100%; padding: 12px; border: none; border-radius: 10px;
//           background: linear-gradient(135deg, #a78bfa, #7c3aed);
//           color: white; font-family: 'Syne', sans-serif;
//           font-size: 14px; font-weight: 700; cursor: pointer;
//           transition: all 0.3s ease;
//           box-shadow: 0 8px 20px rgba(124,58,237,0.3);
//         }
//         .apply-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(124,58,237,0.4); }
//         .apply-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

//         .applied-badge {
//           width: 100%; padding: 12px; border-radius: 10px;
//           background: rgba(52,211,153,0.08);
//           border: 1px solid rgba(52,211,153,0.2);
//           color: #34d399; font-family: 'Syne', sans-serif;
//           font-size: 14px; font-weight: 600; text-align: center;
//         }

//         .file-upload {
//           display: flex; align-items: center; gap: 10px;
//           padding: 10px 14px; border-radius: 10px;
//           border: 1px dashed rgba(167,139,250,0.3);
//           background: rgba(167,139,250,0.04);
//           cursor: pointer; transition: all 0.2s ease;
//           margin-bottom: 10px;
//         }
//         .file-upload:hover { border-color: rgba(167,139,250,0.5); background: rgba(167,139,250,0.08); }
//         .file-upload input { display: none; }

//         .search-input {
//           width: 100%; padding: 12px 20px 12px 44px;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 12px; color: #f5f0eb;
//           font-family: 'Syne', sans-serif; font-size: 14px;
//           outline: none; transition: all 0.3s ease;
//         }
//         .search-input::placeholder { color: rgba(255,255,255,0.2); }
//         .search-input:focus { border-color: rgba(167,139,250,0.4); background: rgba(167,139,250,0.04); }

//         .app-card {
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.07);
//           border-radius: 18px; padding: 24px 28px;
//           display: flex; align-items: center; gap: 20px;
//           transition: all 0.3s ease;
//         }
//         .app-card:hover { border-color: rgba(167,139,250,0.2); background: rgba(167,139,250,0.02); }

//         .skill-tag {
//           display: inline-block; padding: 3px 10px; border-radius: 6px;
//           font-size: 11px; font-weight: 600;
//           background: rgba(167,139,250,0.08); color: #a78bfa;
//           border: 1px solid rgba(167,139,250,0.15); margin: 2px;
//         }

//         .status-pill {
//           display: inline-flex; align-items: center; gap: 6px;
//           padding: 5px 14px; border-radius: 100px;
//           font-size: 12px; font-weight: 700;
//         }
//         .dot { width: 6px; height: 6px; border-radius: 50%; }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .fade-in { animation: fadeIn 0.4s ease both; }
//         .orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
//       `}</style>

//       <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.07)", top: -50, left: 100 }} />
//       <div className="orb" style={{ width: 400, height: 400, background: "rgba(52,211,153,0.04)", bottom: 0, right: 0 }} />

//       {/* Sidebar */}
//       <div style={{
//         width: 240, background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)",
//         display: "flex", flexDirection: "column", padding: "28px 16px", flexShrink: 0, position: "relative", zIndex: 10
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 8px", marginBottom: "36px" }}>
//           <div style={{
//             width: 34, height: 34, borderRadius: "10px",
//             background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontSize: "15px", fontWeight: "800", color: "white"
//           }}>J</div>
//           <div>
//             <div style={{ fontSize: "16px", fontWeight: "700", color: "#f5f0eb", lineHeight: 1 }}>JobPortal</div>
//             <div style={{ fontSize: "10px", color: "#34d399", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>Candidate</div>
//           </div>
//         </div>

//         <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
//           <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "600", padding: "0 8px", marginBottom: "8px" }}>Menu</div>
//           {navItems.map(item => (
//             <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
//               <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                 <span style={{ fontSize: "16px" }}>{item.icon}</span>
//                 {item.label}
//               </span>
//               <span style={{
//                 fontSize: "11px", fontWeight: "700",
//                 background: active === item.id ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.07)",
//                 color: active === item.id ? "#c4b5fd" : "rgba(255,255,255,0.3)",
//                 padding: "2px 8px", borderRadius: "100px"
//               }}>{item.count}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main */}
//       <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>
//         {/* Topbar */}
//         <div style={{
//           padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)",
//           background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)",
//           position: "sticky", top: 0, zIndex: 10,
//           display: "flex", justifyContent: "space-between", alignItems: "center"
//         }}>

//           {active === "jobs" && (
//             <div style={{ position: "relative" }}>
//               <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: "16px", opacity: 0.4 }}>🔍</span>
//               <input
//                 className="search-input"
//                 placeholder="Search jobs, companies..."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 style={{ width: 280 }}
//               />
//             </div>
//           )}
//         </div>

//         <div style={{ padding: "36px 40px" }}>

//           {/* JOBS */}
//           {active === "jobs" && (
//             <div className="fade-in">
//               <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#f5f0eb", marginBottom: "4px" }}>
//                 Available Positions
//               </div>
//               <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "28px" }}>
//                 {filteredJobs.length} opportunities found
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
//                 {filteredJobs.map((job, i) => (
//                   <div className="job-card" key={job._id} style={{ animationDelay: `${i * 0.05}s` }}>
//                     <div style={{
//                       position: "absolute", top: 0, left: 0, right: 0, height: "2px",
//                       background: "linear-gradient(90deg, rgba(167,139,250,0.5), transparent)"
//                     }} />

//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
//                       <div style={{
//                         width: 46, height: 46, borderRadius: "12px",
//                         background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(124,58,237,0.1))",
//                         border: "1px solid rgba(167,139,250,0.15)",
//                         display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
//                       }}>💼</div>
//                       {hasApplied(job._id) && (
//                         <span style={{
//                           fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px",
//                           padding: "4px 10px", borderRadius: "100px",
//                           background: "rgba(52,211,153,0.1)", color: "#34d399",
//                           border: "1px solid rgba(52,211,153,0.2)"
//                         }}>✓ APPLIED</span>
//                       )}
//                     </div>

//                     <div style={{ fontWeight: "700", fontSize: "18px", color: "#f5f0eb", marginBottom: "4px" }}>{job.title}</div>
//                     <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginBottom: "16px" }}>{job.company}</div>

//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
//                       {job.location && <span className="skill-tag">📍 {job.location}</span>}
//                       {job.experience && <span className="skill-tag">⏱ {job.experience}</span>}
//                       {job.qualification && <span className="skill-tag">🎓 {job.qualification}</span>}
//                     </div>

//                     {job.skills && (
//                       <div style={{ marginBottom: "20px" }}>
//                         {job.skills.split(",").map((s, i) => (
//                           <span key={i} className="skill-tag">{s.trim()}</span>
//                         ))}
//                       </div>
//                     )}

//                     <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
//                       {hasApplied(job._id) ? (
//                         <div className="applied-badge">✓ Application Submitted</div>
//                       ) : (
//                         <>
//                           <label className="file-upload" htmlFor={`resume-${job._id}`}>
//                             <span style={{ fontSize: "16px" }}>📎</span>
//                             <span style={{ fontSize: "13px", color: resume ? "#34d399" : "rgba(255,255,255,0.35)", fontWeight: "500" }}>
//                               {resume ? `✓ ${resume.name}` : "Attach your resume"}
//                             </span>
//                             <input id={`resume-${job._id}`} type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} />
//                           </label>
//                           <button
//                             className="apply-btn"
//                             onClick={() => applyJob(job._id)}
//                             disabled={applyingId === job._id}
//                           >
//                             {applyingId === job._id ? "Submitting..." : "Apply Now →"}
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* APPLICATIONS */}
//           {active === "applications" && (
//             <div className="fade-in">
//               <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#f5f0eb", marginBottom: "4px" }}>My Applications</div>
//               <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "28px" }}>{applications.length} total applications</div>

//               {applications.length === 0 && (
//                 <div style={{
//                   textAlign: "center", padding: "80px 20px",
//                   background: "rgba(255,255,255,0.02)", borderRadius: "20px",
//                   border: "1px dashed rgba(255,255,255,0.08)"
//                 }}>
//                   <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
//                   <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>No applications yet</div>
//                   <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.2)" }}>Start browsing and apply to jobs</div>
//                 </div>
//               )}

//               <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//                 {applications.filter(app => app.job).map((app, i) => {
//                   const sc = statusColors[app.status] || statusColors.Pending;
//                   return (
//                     <div className="app-card" key={app._id} style={{ animationDelay: `${i * 0.05}s` }}>
//                       <div style={{
//                         width: 50, height: 50, borderRadius: "14px", flexShrink: 0,
//                         background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(124,58,237,0.1))",
//                         border: "1px solid rgba(167,139,250,0.15)",
//                         display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px"
//                       }}>💼</div>
//                       <div style={{ flex: 1 }}>
//                         <div style={{ fontWeight: "700", fontSize: "16px", color: "#f5f0eb" }}>{app.job.title}</div>
//                         <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>
//                           {app.job.company} · {app.job.location}
//                         </div>
//                       </div>
//                       <span className="status-pill" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>
//                         <span className="dot" style={{ background: sc.color }} />
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
// }

// export default CandidateDashboard;




import { useEffect, useState } from "react";
import axios from "axios";

function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resume, setResume] = useState(null);
  const [username, setUsername] = useState("");
  const [active, setActive] = useState("jobs");
  const [applyingId, setApplyingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
    fetchApplications();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user?.name) {
      setUsername(user.name);
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-applicant-tracking-system.onrender.com/api/jobs"
      );
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-applicant-tracking-system.onrender.com/api/applications/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyJob = async (jobId) => {
    if (!resume) {
      alert("Upload resume first");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resume);

    setApplyingId(jobId);

    try {
      await axios.post(
        "https://job-portal-applicant-tracking-system.onrender.com/api/applications/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchApplications();
    } catch (err) {
      console.log(err);
    } finally {
      setApplyingId(null);
    }
  };

  const hasApplied = (jobId) =>
    applications.some((app) => app.job?._id === jobId);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    {
      id: "jobs",
      label: "Browse Jobs",
      icon: "🔍",
      count: jobs.length,
    },
    {
      id: "applications",
      label: "My Applications",
      icon: "📋",
      count: applications.length,
    },
  ];

  const statusColors = {
    Selected: {
      bg: "rgba(52,211,153,0.1)",
      border: "rgba(52,211,153,0.2)",
      color: "#34d399",
    },
    Rejected: {
      bg: "rgba(248,113,113,0.1)",
      border: "rgba(248,113,113,0.2)",
      color: "#f87171",
    },
    Shortlisted: {
      bg: "rgba(96,165,250,0.1)",
      border: "rgba(96,165,250,0.2)",
      color: "#60a5fa",
    },
    "Not Selected": {
      bg: "rgba(156,163,175,0.1)",
      border: "rgba(156,163,175,0.2)",
      color: "#9ca3af",
    },
    Pending: {
      bg: "rgba(251,191,36,0.1)",
      border: "rgba(251,191,36,0.2)",
      color: "#fbbf24",
    },
  };

  return (
    <div
      className="candidate-dashboard"
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
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(167,139,250,0.3);
          border-radius: 4px;
        }

        /* NAVIGATION */

        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
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

        /* JOB CARD */

        .job-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-width: 0;
        }

        .job-card:hover {
          border-color: rgba(167,139,250,0.2);
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        /* APPLY BUTTON */

        .apply-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(124,58,237,0.3);
        }

        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(124,58,237,0.4);
        }

        .apply-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* APPLIED */

        .applied-badge {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: rgba(52,211,153,0.08);
          border: 1px solid rgba(52,211,153,0.2);
          color: #34d399;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
        }

        /* FILE UPLOAD */

        .file-upload {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px dashed rgba(167,139,250,0.3);
          background: rgba(167,139,250,0.04);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 10px;
          min-width: 0;
        }

        .file-upload:hover {
          border-color: rgba(167,139,250,0.5);
          background: rgba(167,139,250,0.08);
        }

        .file-upload input {
          display: none;
        }

        .file-upload span {
          min-width: 0;
        }

        /* SEARCH */

        .search-input {
          width: 100%;
          padding: 12px 20px 12px 44px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #f5f0eb;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .search-input:focus {
          border-color: rgba(167,139,250,0.4);
          background: rgba(167,139,250,0.04);
        }

        /* APPLICATION CARD */

        .app-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
          min-width: 0;
        }

        .app-card:hover {
          border-color: rgba(167,139,250,0.2);
          background: rgba(167,139,250,0.02);
        }

        .app-card > div {
          min-width: 0;
        }

        /* SKILLS */

        .skill-tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(167,139,250,0.08);
          color: #a78bfa;
          border: 1px solid rgba(167,139,250,0.15);
          margin: 2px;
          max-width: 100%;
          overflow-wrap: anywhere;
        }

        /* STATUS */

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ANIMATION */

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.4s ease both;
        }

        /* ORBS */

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }

        /* =========================
           GENERAL RESPONSIVENESS
           ========================= */

        .candidate-dashboard {
          width: 100%;
          min-width: 0;
        }

        .candidate-sidebar {
          width: 240px;
          flex-shrink: 0;
        }

        .candidate-main {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
        }

        .candidate-topbar {
          min-width: 0;
        }

        .candidate-content {
          min-width: 0;
        }

        .jobs-grid {
          width: 100%;
          min-width: 0;
        }

        /* =========================
           TABLET
           ========================= */

        @media (max-width: 1000px) {

          .candidate-sidebar {
            width: 210px !important;
          }

          .candidate-topbar {
            padding-left: 28px !important;
            padding-right: 28px !important;
          }

          .candidate-content {
            padding: 30px 28px !important;
          }

          .jobs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .job-card {
            padding: 24px !important;
          }
        }

        /* =========================
           SMALL TABLET
           ========================= */

        @media (max-width: 800px) {

          .candidate-dashboard {
            flex-direction: column !important;
            height: 100vh !important;
          }

          .candidate-sidebar {
            width: 100% !important;
            height: auto !important;
            min-height: 70px;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding: 12px 16px !important;
            flex-direction: row !important;
            align-items: center !important;
            overflow: hidden;
          }

          .candidate-sidebar > div:first-child {
            margin-bottom: 0 !important;
            flex-shrink: 0;
          }

          .candidate-sidebar > div:nth-child(2) {
            flex-direction: row !important;
            align-items: center !important;
            overflow-x: auto;
            overflow-y: hidden;
            margin-left: 15px;
            gap: 6px !important;
            flex: 1 !important;
            min-width: 0;
          }

          .candidate-sidebar > div:nth-child(2) > div:first-child {
            display: none;
          }

          .nav-item {
            width: auto !important;
            min-width: max-content;
            white-space: nowrap;
            padding: 9px 12px !important;
          }

          .candidate-main {
            width: 100%;
            flex: 1;
            min-height: 0;
          }

          .candidate-topbar {
            padding: 16px 22px !important;
          }

          .candidate-topbar > div {
            width: 100%;
          }

          .candidate-topbar .search-input {
            width: 100% !important;
          }

          .candidate-content {
            padding: 28px 22px !important;
          }

          .jobs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        /* =========================
           MOBILE
           ========================= */

        @media (max-width: 600px) {

          .candidate-sidebar {
            padding: 10px 12px !important;
          }

          .candidate-sidebar > div:first-child {
            padding: 4px 5px !important;
          }

          .candidate-sidebar > div:first-child > div:first-child {
            width: 30px !important;
            height: 30px !important;
            font-size: 13px !important;
          }

          .candidate-sidebar > div:first-child > div:nth-child(2) > div:first-child {
            font-size: 14px !important;
          }

          .candidate-sidebar > div:first-child > div:nth-child(2) > div:nth-child(2) {
            font-size: 8px !important;
          }

          .candidate-sidebar > div:nth-child(2) {
            margin-left: 8px;
          }

          .nav-item {
            font-size: 12px !important;
            padding: 8px 10px !important;
          }

          .nav-item span {
            gap: 6px !important;
          }

          .nav-item span:first-child > span {
            font-size: 13px !important;
          }

          .candidate-topbar {
            padding: 12px 16px !important;
          }

          .candidate-content {
            padding: 24px 16px !important;
          }

          .candidate-content > div > div:first-child {
            font-size: 25px !important;
          }

          .jobs-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          .job-card {
            padding: 22px !important;
            border-radius: 17px !important;
          }

          .job-card:hover {
            transform: none;
          }

          .job-card > div:nth-child(2) {
            margin-bottom: 13px !important;
          }

          .app-card {
            padding: 18px !important;
            gap: 14px !important;
            align-items: flex-start !important;
          }

          .app-card > div:first-child {
            width: 44px !important;
            height: 44px !important;
            font-size: 19px !important;
          }

          .app-card .status-pill {
            align-self: center;
          }

          .status-pill {
            font-size: 10px;
            padding: 5px 10px;
          }

          .search-input {
            font-size: 13px !important;
            padding: 11px 16px 11px 40px !important;
          }

          .file-upload {
            padding: 10px 11px !important;
          }

          .file-upload span {
            font-size: 12px !important;
          }

          .apply-btn,
          .applied-badge {
            font-size: 13px !important;
            padding: 11px !important;
          }
        }

        /* =========================
           VERY SMALL MOBILE
           ========================= */

        @media (max-width: 450px) {

          .candidate-sidebar {
            min-height: 64px;
          }

          .candidate-sidebar > div:first-child > div:nth-child(2) {
            display: none;
          }

          .candidate-sidebar > div:first-child {
            margin-right: 4px;
          }

          .candidate-sidebar > div:nth-child(2) {
            margin-left: 4px;
          }

          .nav-item {
            padding: 7px 9px !important;
          }

          .nav-item span:first-child > span {
            display: none;
          }

          .nav-item > span:last-child {
            padding: 2px 6px !important;
          }

          .candidate-topbar {
            padding: 10px 12px !important;
          }

          .candidate-content {
            padding: 20px 12px !important;
          }

          .candidate-content > div > div:first-child {
            font-size: 23px !important;
          }

          .candidate-content > div > div:nth-child(2) {
            font-size: 12px !important;
            margin-bottom: 20px !important;
          }

          .job-card {
            padding: 18px !important;
          }

          .job-card > div:nth-child(3) {
            font-size: 17px !important;
          }

          .job-card > div:nth-child(4) {
            font-size: 13px !important;
          }

          .app-card {
            flex-wrap: wrap;
          }

          .app-card > div:nth-child(2) {
            flex: 1;
            min-width: calc(100% - 65px);
          }

          .app-card .status-pill {
            width: 100%;
            justify-content: center;
            margin-top: 2px;
          }

          .orb {
            display: none;
          }
        }

        /* =========================
           EXTRA SMALL DEVICES
           ========================= */

        @media (max-width: 350px) {

          .candidate-sidebar {
            padding: 8px !important;
          }

          .candidate-sidebar > div:first-child {
            padding: 2px !important;
          }

          .candidate-sidebar > div:first-child > div:first-child {
            width: 28px !important;
            height: 28px !important;
          }

          .nav-item {
            font-size: 11px !important;
            padding: 7px 8px !important;
          }

          .candidate-content {
            padding: 18px 10px !important;
          }

          .candidate-content > div > div:first-child {
            font-size: 21px !important;
          }

          .job-card {
            padding: 16px !important;
            border-radius: 15px !important;
          }

          .job-card > div:nth-child(3) {
            font-size: 16px !important;
          }

          .file-upload {
            gap: 6px !important;
            padding: 9px !important;
          }

          .file-upload span {
            font-size: 11px !important;
          }

          .app-card {
            padding: 15px !important;
          }
        }
      `}</style>

      {/* Background Orbs */}

      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          background: "rgba(124,58,237,0.07)",
          top: -50,
          left: 100,
        }}
      />

      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          background: "rgba(52,211,153,0.04)",
          bottom: 0,
          right: 0,
        }}
      />

      {/* =========================
          SIDEBAR
          ========================= */}

      <div
        className="candidate-sidebar"
        style={{
          width: 240,
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "28px 16px",
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo */}

        <div
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
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: "800",
              color: "white",
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
                color: "#34d399",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Candidate
            </div>
          </div>
        </div>

        {/* Navigation */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1,
          }}
        >
          <div
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
            Menu
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                active === item.id ? "active" : ""
              }`}
              onClick={() => setActive(item.id)}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  {item.icon}
                </span>

                {item.label}
              </span>

              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  background:
                    active === item.id
                      ? "rgba(167,139,250,0.2)"
                      : "rgba(255,255,255,0.07)",
                  color:
                    active === item.id
                      ? "#c4b5fd"
                      : "rgba(255,255,255,0.3)",
                  padding: "2px 8px",
                  borderRadius: "100px",
                }}
              >
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================
          MAIN
          ========================= */}

      <div
        className="candidate-main"
        style={{
          flex: 1,
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* =========================
            TOPBAR
            ========================= */}

        <div
          className="candidate-topbar"
          style={{
            padding: "20px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(10,10,15,0.8)",
            backdropFilter: "blur(20px)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {active === "jobs" && (
            <div
              style={{
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  opacity: 0.4,
                }}
              >
                🔍
              </span>

              <input
                className="search-input"
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: 280,
                }}
              />
            </div>
          )}
        </div>

        {/* =========================
            CONTENT
            ========================= */}

        <div
          className="candidate-content"
          style={{
            padding: "36px 40px",
          }}
        >
          {/* =========================
              JOBS
              ========================= */}

          {active === "jobs" && (
            <div className="fade-in">
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "28px",
                  color: "#f5f0eb",
                  marginBottom: "4px",
                }}
              >
                Available Positions
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "28px",
                }}
              >
                {filteredJobs.length} opportunities found
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
                {filteredJobs.map((job, i) => (
                  <div
                    className="job-card"
                    key={job._id}
                    style={{
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    {/* Top line */}

                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background:
                          "linear-gradient(90deg, rgba(167,139,250,0.5), transparent)",
                      }}
                    />

                    {/* Job Icon */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(124,58,237,0.1))",
                          border:
                            "1px solid rgba(167,139,250,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                        }}
                      >
                        💼
                      </div>

                      {hasApplied(job._id) && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            letterSpacing: "0.5px",
                            padding: "4px 10px",
                            borderRadius: "100px",
                            background: "rgba(52,211,153,0.1)",
                            color: "#34d399",
                            border:
                              "1px solid rgba(52,211,153,0.2)",
                          }}
                        >
                          ✓ APPLIED
                        </span>
                      )}
                    </div>

                    {/* Job Title */}

                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "18px",
                        color: "#f5f0eb",
                        marginBottom: "4px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {job.title}
                    </div>

                    {/* Company */}

                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.45)",
                        marginBottom: "16px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {job.company}
                    </div>

                    {/* Job Information */}

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "16px",
                      }}
                    >
                      {job.location && (
                        <span className="skill-tag">
                          📍 {job.location}
                        </span>
                      )}

                      {job.experience && (
                        <span className="skill-tag">
                          ⏱ {job.experience}
                        </span>
                      )}

                      {job.qualification && (
                        <span className="skill-tag">
                          🎓 {job.qualification}
                        </span>
                      )}
                    </div>

                    {/* Skills */}

                    {job.skills && (
                      <div
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        {job.skills.split(",").map((s, i) => (
                          <span
                            key={i}
                            className="skill-tag"
                          >
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Apply Section */}

                    <div
                      style={{
                        borderTop:
                          "1px solid rgba(255,255,255,0.06)",
                        paddingTop: "20px",
                      }}
                    >
                      {hasApplied(job._id) ? (
                        <div className="applied-badge">
                          ✓ Application Submitted
                        </div>
                      ) : (
                        <>
                          <label
                            className="file-upload"
                            htmlFor={`resume-${job._id}`}
                          >
                            <span
                              style={{
                                fontSize: "16px",
                                flexShrink: 0,
                              }}
                            >
                              📎
                            </span>

                            <span
                              style={{
                                fontSize: "13px",
                                color: resume
                                  ? "#34d399"
                                  : "rgba(255,255,255,0.35)",
                                fontWeight: "500",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {resume
                                ? `✓ ${resume.name}`
                                : "Attach your resume"}
                            </span>

                            <input
                              id={`resume-${job._id}`}
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) =>
                                setResume(e.target.files[0])
                              }
                            />
                          </label>

                          <button
                            className="apply-btn"
                            onClick={() =>
                              applyJob(job._id)
                            }
                            disabled={
                              applyingId === job._id
                            }
                          >
                            {applyingId === job._id
                              ? "Submitting..."
                              : "Apply Now →"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================
              APPLICATIONS
              ========================= */}

          {active === "applications" && (
            <div className="fade-in">
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "28px",
                  color: "#f5f0eb",
                  marginBottom: "4px",
                }}
              >
                My Applications
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "28px",
                }}
              >
                {applications.length} total applications
              </div>

              {/* No Applications */}

              {applications.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 20px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "20px",
                    border:
                      "1px dashed rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      marginBottom: "16px",
                    }}
                  >
                    📭
                  </div>

                  <div
                    style={{
                      fontFamily:
                        "'DM Serif Display', serif",
                      fontSize: "22px",
                      color: "rgba(255,255,255,0.4)",
                      marginBottom: "8px",
                    }}
                  >
                    No applications yet
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.2)",
                    }}
                  >
                    Start browsing and apply to jobs
                  </div>
                </div>
              )}

              {/* Application List */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {applications
                  .filter((app) => app.job)
                  .map((app, i) => {
                    const sc =
                      statusColors[app.status] ||
                      statusColors.Pending;

                    return (
                      <div
                        className="app-card"
                        key={app._id}
                        style={{
                          animationDelay: `${i * 0.05}s`,
                        }}
                      >
                        {/* Icon */}

                        <div
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "14px",
                            flexShrink: 0,
                            background:
                              "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(124,58,237,0.1))",
                            border:
                              "1px solid rgba(167,139,250,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "22px",
                          }}
                        >
                          💼
                        </div>

                        {/* Job Details */}

                        <div
                          style={{
                            flex: 1,
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
                            {app.job.title}
                          </div>

                          <div
                            style={{
                              fontSize: "13px",
                              color:
                                "rgba(255,255,255,0.35)",
                              marginTop: "4px",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {app.job.company} ·{" "}
                            {app.job.location}
                          </div>
                        </div>

                        {/* Status */}

                        <span
                          className="status-pill"
                          style={{
                            background: sc.bg,
                            border: `1px solid ${sc.border}`,
                            color: sc.color,
                          }}
                        >
                          <span
                            className="dot"
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
}

export default CandidateDashboard;