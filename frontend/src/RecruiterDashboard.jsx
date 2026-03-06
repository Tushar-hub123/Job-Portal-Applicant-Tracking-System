import { useEffect, useState } from "react";
import axios from "axios";

function RecruiterDashboard() {

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [title,setTitle] = useState("");
  const [company,setCompany] = useState("");
  const [location,setLocation] = useState("");
  const [description,setDescription] = useState("");
  const [skills,setSkills] = useState("");
  const [qualification,setQualification] = useState("");
  const [experience,setExperience] = useState("");

  const token = localStorage.getItem("token");

  useEffect(()=>{
    fetchJobs();
  },[]);

  const fetchJobs = async ()=>{
    try{

      const res = await axios.get(
        "http://localhost:5000/api/jobs/my-jobs",
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      setJobs(res.data);

    }catch(error){
      console.log(error);
    }
  };

  const createJob = async (e)=>{
    e.preventDefault();

    try{

      await axios.post(
        "http://localhost:5000/api/jobs/create",
        {
          title,
          company,
          location,
          description,
          skills,
          qualification,
          experience
        },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      alert("Job Created Successfully");

      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setSkills("");
      setQualification("");
      setExperience("");

      fetchJobs();

    }catch(error){
      console.log(error);
    }
  };

  const viewApplicants = async(jobId)=>{

    try{

      const res = await axios.get(
        `http://localhost:5000/api/applications/job/${jobId}`,
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      setApplications(res.data);
      setSelectedJob(jobId);

    }catch(error){
      console.log(error);
    }
  };

  const deleteJob = async(id)=>{

    try{

      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      fetchJobs();

    }catch(error){
      console.log(error);
    }
  };

  const updateStatus = async(id,status)=>{

    try{

      await axios.put(
        `http://localhost:5000/api/applications/status/${id}`,
        {status},
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      alert("Status Updated");

      viewApplicants(selectedJob);

    }catch(error){
      console.log(error);
    }
  };

  return(

    <div style={styles.container}>

      <h2 style={styles.heading}>Recruiter Dashboard</h2>

      {/* CREATE JOB */}

      <div style={styles.card}>

        <h3>Create Job</h3>

        <form onSubmit={createJob}>

          <input type="text" placeholder="Job Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          style={styles.input}
          required
          />

          <input type="text" placeholder="Company"
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
          style={styles.input}
          required
          />

          <input type="text" placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          style={styles.input}
          />

          <textarea placeholder="Job Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          style={styles.textarea}
          />

          <input type="text" placeholder="Skills Required"
          value={skills}
          onChange={(e)=>setSkills(e.target.value)}
          style={styles.input}
          />

          <input type="text" placeholder="Qualification Required"
          value={qualification}
          onChange={(e)=>setQualification(e.target.value)}
          style={styles.input}
          />

          <input type="text" placeholder="Experience Required"
          value={experience}
          onChange={(e)=>setExperience(e.target.value)}
          style={styles.input}
          />

          <button style={styles.createBtn}>
            Create Job
          </button>

        </form>

      </div>

      {/* JOB LIST */}

      <h3>My Jobs</h3>

      {jobs.map((job)=>(

        <div key={job._id} style={styles.jobCard}>

          <h4>{job.title}</h4>

          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Skills:</b> {job.skills}</p>
          <p><b>Qualification:</b> {job.qualification}</p>
          <p><b>Experience:</b> {job.experience}</p>

          <button
            style={styles.viewBtn}
            onClick={()=>viewApplicants(job._id)}
          >
            View Applicants
          </button>

          <button
            style={styles.deleteBtn}
            onClick={()=>deleteJob(job._id)}
          >
            Delete Job
          </button>

        </div>

      ))}

      {/* APPLICANTS */}

      <h3>Applicants</h3>

     {applications.map((app) => (

  <div key={app._id} style={styles.appCard}>

    <p><b>Name:</b> {app.candidate?.name}</p>
    <p><b>Email:</b> {app.candidate?.email}</p>
    <p><b>Status:</b> {app.status}</p>

    <a
      href={`http://localhost:5000/uploads/${app.resume}`}
      target="_blank"
      rel="noreferrer"
    >
      Download Resume
    </a>

    <br/><br/>

    {/* PENDING STAGE */}

    {app.status === "Pending" && (

      <>
        <button
          style={styles.acceptBtn}
          onClick={() => updateStatus(app._id,"Shortlisted")}
        >
          Shortlist
        </button>

        <button
          style={styles.rejectBtn}
          onClick={() => updateStatus(app._id,"Rejected")}
        >
          Reject
        </button>
      </>
    )}

    {/* SHORTLISTED STAGE */}

    {app.status === "Shortlisted" && (

      <>
        <button
          style={styles.acceptBtn}
          onClick={() => updateStatus(app._id,"Selected")}
        >
          Selected
        </button>

        <button
          style={styles.rejectBtn}
          onClick={() => updateStatus(app._id,"Not Selected")}
        >
          Not Selected
        </button>
      </>
    )}

    {/* FINAL STAGE */}

    {(app.status === "Rejected" ||
      app.status === "Selected" ||
      app.status === "Not Selected") && (

      <button disabled>
        Final Decision Taken
      </button>

    )}

  </div>

))}

    </div>

  );
}

/* CSS */

const styles = {

container:{
  padding:"30px",
  background:"#f4f6fb",
  fontFamily:"Arial"
},

heading:{
  textAlign:"center",
  marginBottom:"30px"
},

card:{
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  marginBottom:"30px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
},

input:{
  width:"100%",
  padding:"10px",
  marginBottom:"10px",
  borderRadius:"6px",
  border:"1px solid #ccc"
},

textarea:{
  width:"100%",
  padding:"10px",
  marginBottom:"10px",
  borderRadius:"6px",
  border:"1px solid #ccc"
},

createBtn:{
  background:"#2563eb",
  color:"white",
  padding:"10px 20px",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer"
},

jobCard:{
  background:"white",
  padding:"15px",
  borderRadius:"10px",
  marginTop:"10px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
},

viewBtn:{
  background:"#10b981",
  color:"white",
  padding:"8px 12px",
  border:"none",
  borderRadius:"5px",
  marginRight:"10px",
  cursor:"pointer"
},

deleteBtn:{
  background:"#ef4444",
  color:"white",
  padding:"8px 12px",
  border:"none",
  borderRadius:"5px",
  cursor:"pointer"
},

appCard:{
  background:"white",
  padding:"15px",
  marginTop:"10px",
  borderRadius:"10px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
},

acceptBtn:{
  background:"#3b82f6",
  color:"white",
  border:"none",
  padding:"8px 12px",
  marginRight:"5px",
  borderRadius:"5px",
  cursor:"pointer"
},

rejectBtn:{
  background:"#ef4444",
  color:"white",
  border:"none",
  padding:"8px 12px",
  marginRight:"5px",
  borderRadius:"5px",
  cursor:"pointer"
},

selectBtn:{
  background:"#22c55e",
  color:"white",
  border:"none",
  padding:"8px 12px",
  marginRight:"5px",
  borderRadius:"5px",
  cursor:"pointer"
},

notSelectBtn:{
  background:"#f59e0b",
  color:"white",
  border:"none",
  padding:"8px 12px",
  borderRadius:"5px",
  cursor:"pointer"
}

};

export default RecruiterDashboard;