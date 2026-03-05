document
.getElementById("applyForm")
.addEventListener("submit", async function (e) {

e.preventDefault();

const formData = new FormData();

formData.append(
"jobId",
document.getElementById("jobId").value
);

formData.append(
"resume",
document.getElementById("resume").files[0]
);

formData.append(
"coverLetter",
document.getElementById("coverLetter").value
);

const token = localStorage.getItem("token");

const res = await fetch(
"http://localhost:5000/api/applications/apply",
{
method: "POST",
headers: {
Authorization: "Bearer " + token
},
body: formData
}
);

const data = await res.json();

alert(data.message);

});