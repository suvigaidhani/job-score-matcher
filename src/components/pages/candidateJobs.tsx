import { useEffect, useState } from "react";
import { FaPaperPlane  } from "react-icons/fa";

import supabase from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./CandidateJobs.css";

export default function CandidateJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Jobs fetch error:", error);
    } else {
      setJobs(data || []);
    }
  }

  return (
    <div className="jobs-page">

      {/* NAVBAR */}
      <nav className="top-nav">
        <h1 className="logo">Job Matcher</h1>
        <span className="nav-link" onClick={() => navigate("/")}>
          Logout
        </span>
      </nav>

      <div className="jobs-container">
        <h2 className="page-title">Available Jobs</h2>

        {jobs.length === 0 && <p>No jobs available.</p>}

        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3 className="job-title">{job.title}</h3>
            <p className="job-desc">{job.description}</p>

            <button
              className="apply-btn"
              onClick={() => navigate(`/candidate/jobs/${job.id}`)}
            >
             <FaPaperPlane /> View & Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
