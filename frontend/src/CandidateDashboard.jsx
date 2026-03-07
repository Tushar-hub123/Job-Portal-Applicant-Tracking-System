import { useEffect, useState } from "react";
import axios from "axios";

function CandidateDashboard() {

  const [jobs,setJobs] = useState([]);
  const [applications,setApplications] = useState([]);
  const [resume,setResume] = useState(null);
  const [username,setUsername] = useState("");
  const [active,setActive] = useState("jobs");

  const token = localStorage.getItem("token");

  useEffect(()=>{

    fetchJobs();
    fetchApplications();

    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      setUsername(user.name);
    }

  },[]);


  const fetchJobs = async () => {
    try{
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    }catch(err){
      console.log(err);
    }
  };


  const fetchApplications = async () => {

    try{

      const res = await axios.get(
        "http://localhost:5000/api/applications/my-applications",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setApplications(res.data);

    }catch(err){
      console.log(err);
    }

  };


  const applyJob = async (jobId) => {

    if(!resume){
      alert("Upload resume first");
      return;
    }

    const formData = new FormData();
    formData.append("jobId",jobId);
    formData.append("resume",resume);

    try{

      await axios.post(
        "http://localhost:5000/api/applications/apply",
        formData,
        {
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"multipart/form-data"
          }
        }
      );

      alert("Application Submitted");

      fetchApplications();

    }catch(err){
      console.log(err);
    }

  };


  const hasApplied = (jobId)=>{
    return applications.some(
      (app)=> app.job?._id === jobId
    );
  };


  return(

    <div style={container}>

      {/* Sidebar */}

      <div style={sidebar}>

        <h2 style={{color:"white"}}>Job Portal</h2>

        <button
          style={menuBtn}
          onClick={()=>setActive("jobs")}
        >
          Available Jobs
        </button>

        <button
          style={menuBtn}
          onClick={()=>setActive("applications")}
        >
          My Applications
        </button>

      </div>


      {/* Main Content */}

      <div style={content}>

        <h2>Welcome {username}</h2>


        {/* ================= JOBS SECTION ================= */}

        {active === "jobs" && (

          <>
            <h3>Available Jobs</h3>

            <div style={jobGrid}>

            {jobs.map((job)=>(

              <div key={job._id} style={jobCard}>

                <h3>{job.title}</h3>

                <p><b>Company:</b> {job.company}</p>

                <p><b>Location:</b> {job.location}</p>

                <p><b>Skills Required:</b> {job.skills}</p>

              <p><b>Qualification:</b> {job.qualification}</p>

              <p><b>Experience:</b> {job.experience}</p>

                {hasApplied(job._id) ? (

                  <button style={appliedBtn}>
                    Already Applied
                  </button>

                ):(

                  <>

                    <input
                      type="file"
                      style={{marginTop:"10px"}}
                      onChange={(e)=>setResume(e.target.files[0])}
                    />

                    <button
                      style={applyBtn}
                      onClick={()=>applyJob(job._id)}
                    >
                      Apply Job
                    </button>

                  </>

                )}

              </div>

            ))}

            </div>

          </>

        )}



        {/* ================= APPLICATION SECTION ================= */}

        {active === "applications" && (

          <>

            <h3>My Applications</h3>

            {applications.length === 0 && (
              <p>No applications yet</p>
            )}

            {applications
            .filter(app => app.job)
            .map((app)=>(

              <div key={app._id} style={appCard}>

                <h3>{app.job.title}</h3>

                <p><b>Company:</b> {app.job.company}</p>

                <p><b>Location:</b> {app.job.location}</p>

                <p>
                  <b>Status:</b>
                  <span style={{
                    color:
                      app.status==="Selected"
?"green"
:app.status==="Rejected"
?"red"
:app.status==="Not Selected"
?"gray"
:app.status==="Shortlisted"
?"blue"
:"orange"
                  }}>
                    {" "} {app.status}
                  </span>
                </p>

              </div>

            ))}

          </>

        )}

      </div>

    </div>

  );
}

export default CandidateDashboard;



/* ================== STYLES ================== */

const container = {
  display:"flex",
  height:"100vh",
  fontFamily:"Arial"
};

const sidebar = {
  width:"230px",
  background:"#1e293b",
  padding:"20px",
  display:"flex",
  flexDirection:"column",
  gap:"10px"
};

const menuBtn = {
  padding:"10px",
  border:"none",
  background:"#334155",
  color:"white",
  cursor:"pointer",
  borderRadius:"5px"
};

const content = {
  flex:1,
  padding:"30px",
  background:"#f1f5f9",
  overflowY:"auto"
};

const jobGrid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
  gap:"20px",
  marginTop:"20px"
};

const jobCard = {
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
};

const applyBtn = {
  marginTop:"10px",
  padding:"10px",
  border:"none",
  background:"#2563eb",
  color:"white",
  borderRadius:"5px",
  cursor:"pointer"
};

const appliedBtn = {
  marginTop:"10px",
  padding:"10px",
  border:"none",
  background:"gray",
  color:"white",
  borderRadius:"5px"
};

const appCard = {
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  marginTop:"15px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
};