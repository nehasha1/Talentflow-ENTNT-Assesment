import Landing from "./pages/Landing";
import HrDashboard from "./pages/HrDashboard";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import CandidateJobs from "./pages/CandidateJobs";
import JobDetails from "./pages/JobDetails";
import Assessments from "./pages/Assessments";
import HrLayout from "./components/layout/HrLayout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/jobs" element={<CandidateJobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/dashboard" element={<HrLayout />}>
        <Route index element={<HrDashboard />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="assessments" element={<Assessments />} />
      </Route>
    </Routes>
  );
}

export default App;
