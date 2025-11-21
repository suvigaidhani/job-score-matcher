import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import "./EmployerJobs.css";

export default function EmployerJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployerJobs();
  }, []);

  async function loadEmployerJobs() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    // FIXED: use user_id not employer_id
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setJobs(data || []);
  }

  function goCreateJob() {
    navigate("/employer/create-job");
  }

  function openApplications(jobId: string) {
    navigate(`/employer/jobs/${jobId}/applications`);
  }

  return (
    <div className="employer-page">
      <nav className="top-nav">
        <h1 className="logo" onClick={() => navigate("/employer/jobs")}>
          Job Match Scorer
        </h1>
        <span className="nav-link" onClick={() => navigate("/login")}>
          Logout
        </span>
      </nav>

      <div className="employer-container">
        <div className="jobs-header">
            <h2>Your Job Posts</h2>

            <button className="post-btn" onClick={goCreateJob}>
                + Post New Job
            </button>
        </div>



        {jobs.length === 0 && (
          <p className="empty-text">You haven't posted any jobs yet.</p>
        )}

        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3 className="job-title">{job.title}</h3>
            <p className="job-desc">{job.description}</p>

            <button
              className="view-btn"
              onClick={() => openApplications(job.id)}
            >
              View Applications
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
