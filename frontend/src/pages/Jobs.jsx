import { useEffect, useState } from "react";
import API from "../api/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>All Jobs</h2>
      {jobs.map(job => (
        <div key={job._id} className="card">
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Jobs;