import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import "./ViewApplications.css";

export default function ViewApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const navigate = useNavigate();
  const { jobId } = useParams();

  useEffect(() => {
    if (jobId) loadApplications(jobId);
  }, [jobId]);

  async function loadApplications(jobId: string) {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("job_id", jobId)
      .order("created_at", { ascending: false });

    if (error) console.error("Load error:", error);
    else setApplications(data || []);
  }

const handleAIScore = async (app: any) => {
  try {
    console.log("Running AI score for resume:", app.resume);

    const { data, error } = await supabase.functions.invoke("resume-score", {
      body: { resume_text: app.resume },
    });

    console.log("AI RAW RESPONSE:", data);

    if (error) {
      alert("AI Scoring Error: " + error.message);
      return;
    }

    if (!data?.result) {
      alert("AI returned no result.");
      return;
    }

    const parsed = JSON.parse(data.result);

    alert(`
AI Score: ${parsed.score}
Strengths: ${parsed.strengths.join(", ")}
Concerns: ${parsed.concerns.join(", ")}
      `);

  } catch (err: any) {
    alert("AI scoring failed: " + err.message);
  }
};

  return (
    <div className="applications-page">
      <nav className="top-nav">
        <h1 className="logo" onClick={() => navigate("/employer/jobs")}>
          Job Match Scorer
        </h1>
        <span className="nav-link" onClick={() => navigate("/login")}>
          Logout
        </span>
      </nav>

      <div className="applications-container">
        <h2>Applications Received</h2>

        {applications.length === 0 && (
          <p className="empty-text">No applications yet for this job.</p>
        )}

        {applications.map((app) => (
          <div className="app-card" key={app.id}>
            <h3>{app.candidate_name}</h3>
            <p>Email: {app.candidate_email}</p>
            
            <button className="AI-btn"
            onClick={() => handleAIScore(app)}
            style={{ marginTop: "10px", padding: "6px 12px" }}
          >
            Run AI Score
          </button>
          
            {app.resume ? (
              <a
                href={app.resume}
                target="_blank"
                rel="noreferrer"
                className="resume-btn"
              >
                View Resume
              </a>
            ) : (
              <p className="no-resume">No resume uploaded</p>
            )}

            {app.ai_feedback && (
              <pre className="feedback-box">
                {JSON.stringify(app.ai_feedback, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
