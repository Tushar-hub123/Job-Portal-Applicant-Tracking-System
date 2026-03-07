import React,{useEffect,useState} from "react";
import axios from "axios";

const AdminDashboard = ()=>{

const [users,setUsers] = useState([]);
const [jobs,setJobs] = useState([]);
const [applications,setApplications] = useState([]);
const [activeTab,setActiveTab] = useState("users");

const token = localStorage.getItem("token");


// ================= FETCH USERS =================

const fetchUsers = async()=>{
try{

const res = await axios.get(
"http://localhost:5000/api/admin/users",
{headers:{Authorization:`Bearer ${token}`}}
);

setUsers(res.data);

}catch(err){
console.log(err);
}
};


// ================= FETCH JOBS =================

const fetchJobs = async()=>{
try{

const res = await axios.get(
"http://localhost:5000/api/admin/jobs",
{headers:{Authorization:`Bearer ${token}`}}
);

setJobs(res.data);

}catch(err){
console.log(err);
}
};


// ================= FETCH APPLICATIONS =================

const fetchApplications = async()=>{
try{

const res = await axios.get(
"http://localhost:5000/api/admin/applications",
{headers:{Authorization:`Bearer ${token}`}}
);

setApplications(res.data);

}catch(err){
console.log(err);
}
};


// ================= APPROVE RECRUITER =================

const approveRecruiter = async(id)=>{
try{

await axios.put(
`http://localhost:5000/api/admin/approve/${id}`,
{},
{headers:{Authorization:`Bearer ${token}`}}
);

alert("Recruiter Approved");
fetchUsers();

}catch(err){
console.log(err);
}
};


// ================= BLOCK RECRUITER =================

const blockRecruiter = async(id)=>{
try{

await axios.put(
`http://localhost:5000/api/admin/block/${id}`,
{},
{headers:{Authorization:`Bearer ${token}`}}
);

alert("Recruiter Blocked");
fetchUsers();

}catch(err){
console.log(err);
}
};


useEffect(()=>{

fetchUsers();
fetchJobs();
fetchApplications();

},[]);



return(

<div style={styles.wrapper}>

{/* SIDEBAR */}

<div style={styles.sidebar}>

<h2 style={styles.logo}>Admin Panel</h2>

<button style={styles.menuBtn} onClick={()=>setActiveTab("users")}>
Manage Users
</button>

<button style={styles.menuBtn} onClick={()=>setActiveTab("jobs")}>
All Jobs
</button>

<button style={styles.menuBtn} onClick={()=>setActiveTab("applications")}>
Applications
</button>

</div>



{/* MAIN CONTENT */}

<div style={styles.content}>

<h1 style={styles.heading}>Admin Dashboard</h1>


{/* ================= USERS ================= */}

{activeTab==="users" && (

<>

<h2>Manage Users</h2>

<div style={styles.grid}>

{users.map((user)=>(

<div key={user._id} style={styles.card}>

<p><b>Name:</b> {user.name}</p>
<p><b>Email:</b> {user.email}</p>
<p><b>Role:</b> {user.role}</p>

{user.role==="recruiter" && (

<>

<p>
<b>Status:</b>
<span style={{
color:user.approved ? "green":"red"
}}>
{user.approved ? " Approved":" Blocked"}
</span>
</p>

<button
style={styles.approveBtn}
onClick={()=>approveRecruiter(user._id)}
>
Approve
</button>

<button
style={styles.blockBtn}
onClick={()=>blockRecruiter(user._id)}
>
Block
</button>

</>

)}

</div>

))}

</div>

</>

)}



{/* ================= JOBS ================= */}

{activeTab==="jobs" && (

<>

<h2>All Jobs</h2>

<div style={styles.grid}>

{jobs.map((job)=>(

<div key={job._id} style={styles.card}>

<p><b>Title:</b> {job.title}</p>
<p><b>Company:</b> {job.company}</p>
<p><b>Location:</b> {job.location}</p>
<p><b>Recruiter:</b> {job.recruiter?.name}</p>

</div>

))}

</div>

</>

)}



{/* ================= APPLICATIONS ================= */}

{activeTab==="applications" && (

<>

<h2>All Applications</h2>

<div style={styles.grid}>

{applications.map((app)=>(

<div key={app._id} style={styles.card}>

<p><b>Candidate:</b> {app.candidate?.name}</p>

<p><b>Job:</b> {app.job?.title}</p>

<p><b>Company:</b> {app.job?.company}</p>

<p>
<b>Status:</b>
<span style={{
color:
app.status==="Selected"
?"green"
:app.status==="Rejected"
?"red"
:"orange"
}}>
{" "+app.status}
</span>
</p>

</div>

))}

</div>

</>

)}

</div>

</div>

);

};



// ================= CSS =================

const styles ={

wrapper:{
display:"flex",
fontFamily:"Arial",
height:"100vh"
},

sidebar:{
width:"230px",
background:"#1e293b",
color:"#fff",
padding:"20px",
display:"flex",
flexDirection:"column",
gap:"15px"
},

logo:{
marginBottom:"20px"
},

menuBtn:{
padding:"10px",
background:"#334155",
border:"none",
color:"#fff",
borderRadius:"6px",
cursor:"pointer"
},

content:{
flex:1,
padding:"30px",
background:"#f1f5f9",
overflowY:"auto"
},

heading:{
marginBottom:"20px"
},

grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
gap:"20px"
},

card:{
background:"#fff",
padding:"15px",
borderRadius:"10px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)"
},

approveBtn:{
background:"#16a34a",
color:"#fff",
border:"none",
padding:"8px 12px",
marginRight:"10px",
borderRadius:"5px",
cursor:"pointer"
},

blockBtn:{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"8px 12px",
borderRadius:"5px",
cursor:"pointer"
}

};

export default AdminDashboard;