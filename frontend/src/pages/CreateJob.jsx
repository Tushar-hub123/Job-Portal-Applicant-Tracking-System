import { useState } from "react";
import API from "../api/axios";

const CreateJob = () => {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/jobs", form);
    alert("Job Created");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Create Job</h2>
      <input placeholder="Title"
        onChange={e => setForm({...form,title:e.target.value})}/>
      <textarea placeholder="Description"
        onChange={e => setForm({...form,description:e.target.value})}/>
      <input placeholder="Location"
        onChange={e => setForm({...form,location:e.target.value})}/>
      <button>Create</button>
    </form>
  );
};

export default CreateJob;