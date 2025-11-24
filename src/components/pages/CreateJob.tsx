import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import "./CreateJob.css";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  // ------------------------------
  // 🚀 Create Job Handler
  // ------------------------------
  async function handleCreateJob(e: any) {
    e.preventDefault();

    // 🔥 Get logged in user properly
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      alert("You must be logged in to create a job!");
      return;
    }

    const user = userData.user;

    // ------------------------------------
    // 🚨 Check if the user is an employer
    // ------------------------------------
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      alert("Unable to verify role! Please try again.");
      return;
    }

    if (profile.role !== "employer") {
      alert("Only employers are allowed to post jobs.");
      return;
    }

    // ------------------------------------
    // 📝 Insert job into jobs table
    // ------------------------------------
    const { error: insertError } = await supabase.from("jobs").insert({
      title,
      description,
      experience: Number(experience),
      user_id: user.id, // 🔥 Required for RLS
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      alert("Failed to create job!");
      return;
    }

    alert("Job created successfully!");
    navigate("/employer/jobs");
  }

  return (
    <div className="page-wrapper">
      <nav className="top-nav">
        <h1 className="logo">Job Matcher</h1>
        <span className="nav-link" onClick={() => navigate("/employer/jobs")}>
          Back to Jobs
        </span>
      </nav>

      <div className="create-card">
        <h2>Post a New Job</h2>

        <form onSubmit={handleCreateJob}>
          <label>Job Title</label>
          <input
            type="text"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label>Experience</label>
          <input
            type="number"
            placeholder="e.g. 3"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />

          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
}
