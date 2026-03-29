// import { useEffect, useState } from "react";
// import axios from "axios";

// function RecruiterDashboard() {

//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);

//   const [title,setTitle] = useState("");
//   const [company,setCompany] = useState("");
//   const [location,setLocation] = useState("");
//   const [description,setDescription] = useState("");
//   const [skills,setSkills] = useState("");
//   const [qualification,setQualification] = useState("");
//   const [experience,setExperience] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(()=>{
//     fetchJobs();
//   },[]);

//   const fetchJobs = async ()=>{
//     try{

//       const res = await axios.get(
//         "http://localhost:5000/api/jobs/my-jobs",
//         {
//           headers:{ Authorization:`Bearer ${token}` }
//         }
//       );

//       setJobs(res.data);

//     }catch(error){
//       console.log(error);
//     }
//   };

//   const createJob = async (e)=>{
//     e.preventDefault();

//     try{

//       await axios.post(
//         "http://localhost:5000/api/jobs/create",
//         {
//           title,
//           company,
//           location,
//           description,
//           skills,
//           qualification,
//           experience
//         },
//         {
//           headers:{ Authorization:`Bearer ${token}` }
//         }
//       );

//       alert("Job Created Successfully");

//       setTitle("");
//       setCompany("");
//       setLocation("");
//       setDescription("");
//       setSkills("");
//       setQualification("");
//       setExperience("");

//       fetchJobs();

//     }catch(error){
//       alert("Your profile is not approved by admin");
//       setTitle("");
//       setCompany("");
//       setLocation("");
//       setDescription("");
//       setSkills("");
//       setQualification("");
//       setExperience("");
//       console.log(error);
//     }
//   };

//   const viewApplicants = async(jobId)=>{

//     try{

//       const res = await axios.get(
//         `http://localhost:5000/api/applications/job/${jobId}`,
//         {
//           headers:{ Authorization:`Bearer ${token}` }
//         }
//       );

//       setApplications(res.data);
//       setSelectedJob(jobId);

//     }catch(error){
//       console.log(error);
//     }
//   };

//   const deleteJob = async(id)=>{

//     try{

//       await axios.delete(
//         `http://localhost:5000/api/jobs/${id}`,
//         {
//           headers:{ Authorization:`Bearer ${token}` }
//         }
//       );

//       fetchJobs();

//     }catch(error){
//       console.log(error);
//     }
//   };

//   const updateStatus = async(id,status)=>{

//     try{

//       await axios.put(
//         `http://localhost:5000/api/applications/status/${id}`,
//         {status},
//         {
//           headers:{ Authorization:`Bearer ${token}` }
//         }
//       );

//       alert("Status Updated");

//       viewApplicants(selectedJob);

//     }catch(error){
//       console.log(error);
//     }
//   };

//   return(

//     <div style={styles.container}>

//       <h2 style={styles.heading}>Recruiter Dashboard</h2>

//       {/* CREATE JOB */}

//       <div style={styles.card}>

//         <h3>Create Job</h3>

//         <form onSubmit={createJob}>

//           <input type="text" placeholder="Job Title"
//           value={title}
//           onChange={(e)=>setTitle(e.target.value)}
//           style={styles.input}
//           required
//           />

//           <input type="text" placeholder="Company"
//           value={company}
//           onChange={(e)=>setCompany(e.target.value)}
//           style={styles.input}
//           required
//           />

//           <input type="text" placeholder="Location"
//           value={location}
//           onChange={(e)=>setLocation(e.target.value)}
//           style={styles.input}
//           />

//           <textarea placeholder="Job Description"
//           value={description}
//           onChange={(e)=>setDescription(e.target.value)}
//           style={styles.textarea}
//           />

//           <input type="text" placeholder="Skills Required"
//           value={skills}
//           onChange={(e)=>setSkills(e.target.value)}
//           style={styles.input}
//           />

//           <input type="text" placeholder="Qualification Required"
//           value={qualification}
//           onChange={(e)=>setQualification(e.target.value)}
//           style={styles.input}
//           />

//           <input type="text" placeholder="Experience Required"
//           value={experience}
//           onChange={(e)=>setExperience(e.target.value)}
//           style={styles.input}
//           />

//           <button style={styles.createBtn}>
//             Create Job
//           </button>

//         </form>

//       </div>

//       {/* JOB LIST */}

//       <h3>My Jobs</h3>

//       {jobs.map((job)=>(

//         <div key={job._id} style={styles.jobCard}>

//           <h4>{job.title}</h4>

//           <p><b>Company:</b> {job.company}</p>
//           <p><b>Location:</b> {job.location}</p>
//           <p><b>Skills:</b> {job.skills}</p>
//           <p><b>Qualification:</b> {job.qualification}</p>
//           <p><b>Experience:</b> {job.experience}</p>

//           <button
//             style={styles.viewBtn}
//             onClick={()=>viewApplicants(job._id)}
//           >
//             View Applicants
//           </button>

//           <button
//             style={styles.deleteBtn}
//             onClick={()=>deleteJob(job._id)}
//           >
//             Delete Job
//           </button>

//         </div>

//       ))}

//       {/* APPLICANTS */}

//       <h3>Applicants</h3>

//      {applications.map((app) => (

//   <div key={app._id} style={styles.appCard}>

//     <p><b>Name:</b> {app.candidate?.name}</p>
//     <p><b>Email:</b> {app.candidate?.email}</p>
//     <p><b>Status:</b> {app.status}</p>

//     <a
//       href={`http://localhost:5000/uploads/${app.resume}`}
//       target="_blank"
//       rel="noreferrer"
//     >
//       Download Resume
//     </a>

//     <br/><br/>

//     {/* PENDING STAGE */}

//     {app.status === "Pending" && (

//       <>
//         <button
//           style={styles.acceptBtn}
//           onClick={() => updateStatus(app._id,"Shortlisted")}
//         >
//           Shortlist
//         </button>

//         <button
//           style={styles.rejectBtn}
//           onClick={() => updateStatus(app._id,"Rejected")}
//         >
//           Reject
//         </button>
//       </>
//     )}

//     {/* SHORTLISTED STAGE */}

//     {app.status === "Shortlisted" && (

//       <>
//         <button
//           style={styles.acceptBtn}
//           onClick={() => updateStatus(app._id,"Selected")}
//         >
//           Selected
//         </button>

//         <button
//           style={styles.rejectBtn}
//           onClick={() => updateStatus(app._id,"Not Selected")}
//         >
//           Not Selected
//         </button>
//       </>
//     )}

//     {/* FINAL STAGE */}

//     {(app.status === "Rejected" ||
//       app.status === "Selected" ||
//       app.status === "Not Selected") && (

//       <button disabled>
//         Final Decision Taken
//       </button>

//     )}

//   </div>

// ))}

//     </div>

//   );
// }

// /* CSS */

// const styles = {

// container:{
//   padding:"30px",
//   background:"#f4f6fb",
//   fontFamily:"Arial"
// },

// heading:{
//   textAlign:"center",
//   marginBottom:"30px"
// },

// card:{
//   background:"white",
//   padding:"20px",
//   borderRadius:"10px",
//   marginBottom:"30px",
//   boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
// },

// input:{
//   width:"100%",
//   padding:"10px",
//   marginBottom:"10px",
//   borderRadius:"6px",
//   border:"1px solid #ccc"
// },

// textarea:{
//   width:"100%",
//   padding:"10px",
//   marginBottom:"10px",
//   borderRadius:"6px",
//   border:"1px solid #ccc"
// },

// createBtn:{
//   background:"#2563eb",
//   color:"white",
//   padding:"10px 20px",
//   border:"none",
//   borderRadius:"6px",
//   cursor:"pointer"
// },

// jobCard:{
//   background:"white",
//   padding:"15px",
//   borderRadius:"10px",
//   marginTop:"10px",
//   boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
// },

// viewBtn:{
//   background:"#10b981",
//   color:"white",
//   padding:"8px 12px",
//   border:"none",
//   borderRadius:"5px",
//   marginRight:"10px",
//   cursor:"pointer"
// },

// deleteBtn:{
//   background:"#ef4444",
//   color:"white",
//   padding:"8px 12px",
//   border:"none",
//   borderRadius:"5px",
//   cursor:"pointer"
// },

// appCard:{
//   background:"white",
//   padding:"15px",
//   marginTop:"10px",
//   borderRadius:"10px",
//   boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
// },

// acceptBtn:{
//   background:"#3b82f6",
//   color:"white",
//   border:"none",
//   padding:"8px 12px",
//   marginRight:"5px",
//   borderRadius:"5px",
//   cursor:"pointer"
// },

// rejectBtn:{
//   background:"#ef4444",
//   color:"white",
//   border:"none",
//   padding:"8px 12px",
//   marginRight:"5px",
//   borderRadius:"5px",
//   cursor:"pointer"
// },

// selectBtn:{
//   background:"#22c55e",
//   color:"white",
//   border:"none",
//   padding:"8px 12px",
//   marginRight:"5px",
//   borderRadius:"5px",
//   cursor:"pointer"
// },

// notSelectBtn:{
//   background:"#f59e0b",
//   color:"white",
//   border:"none",
//   padding:"8px 12px",
//   borderRadius:"5px",
//   cursor:"pointer"
// }

// };

// export default RecruiterDashboard;

import { useEffect, useState } from "react";
import axios from "axios";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [active, setActive] = useState("create");
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    title: "", company: "", location: "", description: "",
    skills: "", qualification: "", experience: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) { console.log(err); }
  };

  const createJob = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await axios.post("http://localhost:5000/api/jobs/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: "", company: "", location: "", description: "", skills: "", qualification: "", experience: "" });
      fetchJobs();
      setActive("jobs");
    } catch (err) {
      alert("Your profile is not approved by admin");
    } finally { setCreating(false); }
  };

  const viewApplicants = async (jobId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
      setSelectedJob(jobId);
      setActive("applicants");
    } catch (err) { console.log(err); }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) { console.log(err); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/status/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      viewApplicants(selectedJob);
    } catch (err) { console.log(err); }
  };

  const navItems = [
    { id: "create", label: "Post a Job", icon: "✏️" },
    { id: "jobs", label: "My Listings", icon: "💼", count: jobs.length },
    { id: "applicants", label: "Applicants", icon: "👥", count: applications.length },
  ];

  const statusColors = {
    Selected: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)", color: "#34d399" },
    Rejected: { bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)", color: "#f87171" },
    Shortlisted: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.2)", color: "#60a5fa" },
    "Not Selected": { bg: "rgba(156,163,175,0.1)", border: "rgba(156,163,175,0.2)", color: "#9ca3af" },
    Pending: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Syne', sans-serif", background: "#0a0a0f", color: "#f5f0eb", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.3); border-radius: 4px; }

        .nav-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; border-radius: 12px; cursor: pointer;
          transition: all 0.2s ease; border: none; background: transparent;
          color: rgba(245,240,235,0.45); font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 500; width: 100%; text-align: left;
        }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #f5f0eb; }
        .nav-item.active { background: rgba(167,139,250,0.12); color: #c4b5fd; border: 1px solid rgba(167,139,250,0.2); }

        .form-input {
          width: 100%; padding: 14px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px; color: #f5f0eb;
          font-family: 'Syne', sans-serif; font-size: 14px;
          outline: none; transition: all 0.3s ease;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }
        .form-input:focus {
          border-color: rgba(167,139,250,0.45);
          background: rgba(167,139,250,0.04);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.08);
        }
        textarea.form-input { resize: vertical; min-height: 100px; line-height: 1.6; }

        .submit-btn {
          padding: 15px 36px; border: none; border-radius: 12px;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          color: white; font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700; cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 12px 30px rgba(124,58,237,0.3);
        }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(124,58,237,0.4); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .job-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 28px;
          transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .job-card:hover { border-color: rgba(167,139,250,0.2); transform: translateY(-2px); box-shadow: 0 20px 40px rgba(0,0,0,0.25); }

        .action-btn {
          padding: 8px 18px; border: none; border-radius: 8px;
          font-family: 'Syne', sans-serif; font-size: 13px;
          font-weight: 600; cursor: pointer; transition: all 0.2s ease;
        }

        .view-btn { background: rgba(96,165,250,0.12); color: #60a5fa; border: 1px solid rgba(96,165,250,0.2); }
        .view-btn:hover { background: rgba(96,165,250,0.22); transform: translateY(-1px); }

        .delete-btn { background: rgba(248,113,113,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.18); }
        .delete-btn:hover { background: rgba(248,113,113,0.2); transform: translateY(-1px); }

        .shortlist-btn { background: rgba(96,165,250,0.12); color: #60a5fa; border: 1px solid rgba(96,165,250,0.2); }
        .shortlist-btn:hover { background: rgba(96,165,250,0.22); }

        .reject-btn { background: rgba(248,113,113,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.18); }
        .reject-btn:hover { background: rgba(248,113,113,0.2); }

        .select-btn { background: rgba(52,211,153,0.1); color: #34d399; border: 1px solid rgba(52,211,153,0.2); }
        .select-btn:hover { background: rgba(52,211,153,0.2); }

        .notselect-btn { background: rgba(156,163,175,0.1); color: #9ca3af; border: 1px solid rgba(156,163,175,0.2); }
        .notselect-btn:hover { background: rgba(156,163,175,0.18); }

        .app-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 24px; transition: all 0.3s ease;
        }
        .app-card:hover { border-color: rgba(167,139,250,0.15); }

        .skill-tag {
          display: inline-block; padding: 3px 10px; border-radius: 6px;
          font-size: 11px; font-weight: 600;
          background: rgba(167,139,250,0.08); color: #a78bfa;
          border: 1px solid rgba(167,139,250,0.15); margin: 2px;
        }

        .status-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 100px;
          font-size: 12px; font-weight: 700;
        }
        .sdot { width: 6px; height: 6px; border-radius: 50%; }

        .resume-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 8px; text-decoration: none;
          background: rgba(251,191,36,0.1); color: #fbbf24;
          border: 1px solid rgba(251,191,36,0.2);
          font-size: 13px; font-weight: 600;
          transition: all 0.2s ease; font-family: 'Syne', sans-serif;
        }
        .resume-link:hover { background: rgba(251,191,36,0.18); transform: translateY(-1px); }

        .form-label {
          display: block; font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.35); letter-spacing: 0.8px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease both; }
        .orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
      `}</style>

      <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.08)", top: -100, right: 100 }} />
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(251,191,36,0.04)", bottom: 0, left: 200 }} />

      {/* Sidebar */}
      <div style={{
        width: 240, background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column", padding: "28px 16px", flexShrink: 0, position: "relative", zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 8px", marginBottom: "36px" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "10px",
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "15px", fontWeight: "800", color: "white"
          }}>J</div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#f5f0eb", lineHeight: 1 }}>JobPortal</div>
            <div style={{ fontSize: "10px", color: "#fbbf24", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>Recruiter</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "600", padding: "0 8px", marginBottom: "8px" }}>Menu</div>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {item.label}
              </span>
              {item.count !== undefined && (
                <span style={{
                  fontSize: "11px", fontWeight: "700",
                  background: active === item.id ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.07)",
                  color: active === item.id ? "#c4b5fd" : "rgba(255,255,255,0.3)",
                  padding: "2px 8px", borderRadius: "100px"
                }}>{item.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Stats mini */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          {[
            { label: "Jobs Posted", val: jobs.length, color: "#a78bfa" },
            { label: "Applicants", val: applications.length, color: "#34d399" },
          ].map(s => (
            <div key={s.label} style={{
              padding: "12px 14px", borderRadius: "12px",
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{s.label}</span>
              <span style={{ fontSize: "18px", fontFamily: "'DM Serif Display', serif", color: s.color }}>{s.val}</span>
            </div>
          ))}
        </div>

        <div style={{
          padding: "14px 16px", borderRadius: "14px", background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "12px"
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "15px", fontWeight: "700", color: "white"
          }}>R</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#f5f0eb" }}>Recruiter</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Hiring Manager</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>
        {/* Topbar */}
        <div style={{
          padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)",
          position: "sticky", top: 0, zIndex: 10,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px" }}>Recruiter Portal</div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", fontWeight: "400", color: "#f5f0eb" }}>
              {navItems.find(n => n.id === active)?.label}
            </h1>
          </div>
          <button
            className="submit-btn"
            style={{ padding: "10px 24px", fontSize: "13px" }}
            onClick={() => setActive("create")}
          >+ Post Job</button>
        </div>

        <div style={{ padding: "36px 40px" }}>

          {/* CREATE JOB */}
          {active === "create" && (
            <div className="fade-in" style={{ maxWidth: 700 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#f5f0eb", marginBottom: "4px" }}>
                Post a New Job
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "36px" }}>
                Fill in the details to attract the right candidates
              </div>

              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px", padding: "36px"
              }}>
                <form onSubmit={createJob} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div className="form-row">
                    <div>
                      <label className="form-label">Job Title *</label>
                      <input className="form-input" placeholder="e.g. Senior Frontend Developer" required
                        value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Company *</label>
                      <input className="form-input" placeholder="e.g. Acme Corp" required
                        value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <label className="form-label">Location</label>
                      <input className="form-input" placeholder="e.g. Bangalore, Remote"
                        value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Experience</label>
                      <input className="form-input" placeholder="e.g. 2–4 years"
                        value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <label className="form-label">Qualification</label>
                      <input className="form-input" placeholder="e.g. B.Tech / BCA"
                        value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Skills Required</label>
                      <input className="form-input" placeholder="e.g. React, Node.js, SQL"
                        value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Job Description</label>
                    <textarea className="form-input" placeholder="Describe the role, responsibilities, and what you're looking for..."
                      value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "8px" }}>
                    <button type="submit" className="submit-btn" disabled={creating}>
                      {creating ? "Posting..." : "Post Job →"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MY JOBS */}
          {active === "jobs" && (
            <div className="fade-in">
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#f5f0eb", marginBottom: "4px" }}>My Listings</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "28px" }}>{jobs.length} active job posts</div>

              {jobs.length === 0 && (
                <div style={{
                  textAlign: "center", padding: "80px 20px",
                  background: "rgba(255,255,255,0.02)", borderRadius: "20px",
                  border: "1px dashed rgba(255,255,255,0.07)"
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>No jobs posted yet</div>
                  <button className="submit-btn" style={{ fontSize: "14px", padding: "12px 28px" }} onClick={() => setActive("create")}>
                    Post your first job →
                  </button>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
                {jobs.map((job, i) => (
                  <div className="job-card" key={job._id} style={{ animationDelay: `${i * 0.05}s` }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                      background: "linear-gradient(90deg, rgba(251,191,36,0.5), transparent)"
                    }} />
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
                      <div style={{
                        width: 46, height: 46, borderRadius: "12px", flexShrink: 0,
                        background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.1))",
                        border: "1px solid rgba(251,191,36,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
                      }}>🏢</div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "17px", color: "#f5f0eb" }}>{job.title}</div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{job.company}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                      {job.location && <span className="skill-tag">📍 {job.location}</span>}
                      {job.experience && <span className="skill-tag">⏱ {job.experience}</span>}
                      {job.qualification && <span className="skill-tag">🎓 {job.qualification}</span>}
                    </div>

                    {job.skills && (
                      <div style={{ marginBottom: "20px" }}>
                        {job.skills.split(",").map((s, i) => (
                          <span key={i} className="skill-tag">{s.trim()}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "18px" }}>
                      <button className="action-btn view-btn" onClick={() => viewApplicants(job._id)}>
                        👥 Applicants
                      </button>
                      <button className="action-btn delete-btn" onClick={() => deleteJob(job._id)}>
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APPLICANTS */}
          {active === "applicants" && (
            <div className="fade-in">
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#f5f0eb", marginBottom: "4px" }}>Applicants</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "28px" }}>
                {applications.length} candidates applied for this role
              </div>

              {applications.length === 0 && (
                <div style={{
                  textAlign: "center", padding: "80px 20px",
                  background: "rgba(255,255,255,0.02)", borderRadius: "20px",
                  border: "1px dashed rgba(255,255,255,0.07)"
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", color: "rgba(255,255,255,0.35)" }}>No applicants yet</div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {applications.map((app, i) => {
                  const sc = statusColors[app.status] || statusColors.Pending;
                  return (
                    <div className="app-card" key={app._id} style={{ animationDelay: `${i * 0.05}s` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: "50%",
                          background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "18px", fontWeight: "700", color: "white", flexShrink: 0
                        }}>{app.candidate?.name?.charAt(0)?.toUpperCase()}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "700", fontSize: "16px", color: "#f5f0eb" }}>{app.candidate?.name}</div>
                          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{app.candidate?.email}</div>
                        </div>
                        <span className="status-pill" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>
                          <span className="sdot" style={{ background: sc.color }} />
                          {app.status}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <a className="resume-link" href={`http://localhost:5000/uploads/${app.resume}`} target="_blank" rel="noreferrer">
                          📄 Download Resume
                        </a>

                        {app.status === "Pending" && (
                          <>
                            <button className="action-btn shortlist-btn" onClick={() => updateStatus(app._id, "Shortlisted")}>✓ Shortlist</button>
                            <button className="action-btn reject-btn" onClick={() => updateStatus(app._id, "Rejected")}>✕ Reject</button>
                          </>
                        )}

                        {app.status === "Shortlisted" && (
                          <>
                            <button className="action-btn select-btn" onClick={() => updateStatus(app._id, "Selected")}>🎉 Select</button>
                            <button className="action-btn notselect-btn" onClick={() => updateStatus(app._id, "Not Selected")}>✕ Not Selected</button>
                          </>
                        )}

                        {["Rejected", "Selected", "Not Selected"].includes(app.status) && (
                          <span style={{
                            fontSize: "13px", padding: "8px 16px", borderRadius: "8px",
                            background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)",
                            border: "1px solid rgba(255,255,255,0.07)", fontWeight: "500"
                          }}>🔒 Final Decision Taken</span>
                        )}
                      </div>
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

export default RecruiterDashboard;