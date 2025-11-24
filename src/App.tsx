import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/components/pages/Login";
import Signup from "./components/pages/SignUp";
import CandidateJobs from "./components/pages/candidateJobs";
import JobDetails from "./components/pages/JobDetails";
import EmployerJobs from "./components/pages/EmployerJobs";
import CreateJob from "./components/pages/CreateJob";
import ViewApplications from "./components/pages/ViewApplications";
import Home from "./components/pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/candidate/jobs" element={<CandidateJobs />} />
        <Route path="/candidate/jobs/:jobId" element={<JobDetails />} />
        <Route path="/employer/jobs" element={<EmployerJobs />} />
        <Route path="/employer/create-job" element={<CreateJob />} />
        <Route path="/employer/jobs/:jobId/applications" element={<ViewApplications />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
