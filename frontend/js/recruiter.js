const token = localStorage.getItem("token");

async function loadApplications() {

const jobId = "JOB_ID_HERE";

const res = await fetch(
"http://localhost:5000/api/applications/job/" + jobId,
{
headers: {
Authorization: "Bearer " + token
}
}
);

const data = await res.json();

const container = document.getElementById("applications");

data.forEach(app => {

container.innerHTML += `
<div>

<p><b>Candidate:</b> ${app.candidate.name}</p>
<p><b>Email:</b> ${app.candidate.email}</p>

<p>
<a href="http://localhost:5000/${app.resumeUrl}" target="_blank">
Download Resume
</a>
</p>

<p>Status: ${app.status}</p>

<button onclick="updateStatus('${app._id}','Accepted')">
Shortlist
</button>

<button onclick="updateStatus('${app._id}','Rejected')">
Reject
</button>

<hr>

</div>
`;

});

}

async function updateStatus(id,status){

await fetch(
"http://localhost:5000/api/applications/status/"+id,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+token
},
body:JSON.stringify({status})
}
);

alert("Status Updated");
location.reload();

}

loadApplications();