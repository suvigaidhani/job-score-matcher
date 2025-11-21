import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import "./JobDetails.css";

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<any>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [resumeText, setResumeText] = useState("");

  useEffect(() => {
    loadJobDetails();
  }, []);

  async function loadJobDetails() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (error) console.error("Job fetch error:", error);
    else setJob(data);
  }

  async function handleApply(e: any) {
    e.preventDefault();

    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase.from("applications").insert({
      job_id: jobId,
      candidate_id: user?.id,
      candidate_name: candidateName,
      candidate_email: candidateEmail,
      resume: resumeText,
    });

    if (error) {
      alert("Application failed: " + error.message);
    } else {
      alert("Application submitted successfully!");
      navigate("/candidate/jobs");
    }
  }

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="jobdetails-page">

      <nav className="top-nav">
        <h1 className="logo" onClick={() => navigate("/candidate/jobs")}>
          Job Match Scorer
        </h1>
        <span className="nav-link" onClick={() => navigate("/login")}>
          Logout
        </span>
      </nav>

      <div className="jobdetails-card">
        <h2 className="job-title">{job.title}</h2>
        <p className="job-desc">{job.description}</p>

        <h3 className="apply-heading">Apply for this job</h3>

        <form onSubmit={handleApply} className="apply-form">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={candidateEmail}
            onChange={(e) => setCandidateEmail(e.target.value)}
          />

          <label>Resume Text</label>
          <textarea
            placeholder="Paste your resume text"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
}
