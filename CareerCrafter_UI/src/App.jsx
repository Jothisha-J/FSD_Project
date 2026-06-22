import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EmployeeOnboard from "./pages/Admin/EmployeeOnboard";
import EmployeeList from "./pages/lists/EmployeeList";
import JobSeekerList from "./pages/lists/JobSeekerList";
import ApplicationList from "./pages/lists/ApplicationList";
import SkillList from "./pages/lists/SkillList";
import JobSeekerProfile from "./pages/jobSeeker/JobSeekerProfile";
import MyApplications from "./pages/jobSeeker/MyApplications";
import MySkills from "./pages/jobSeeker/MySkills";
import MyExperience from "./pages/jobSeeker/MyExperience";
import MyEducation from "./pages/jobSeeker/MyEducation";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import MyJobs from "./pages/employee/MyJobs";
import PostJob from "./pages/employee/PostJob";
import Register from "./Register";
import JobListing from "./pages/employee/JobListing";
import ForRecruiters from "./pages/employee/ForRecruiters";
import AboutUs from "./Aboutus";
import JobList from "./pages/lists/JobList";
import JobDetails from "./pages/employee/JobDetails";
import JobSeekerDashboard from "./pages/Admin/JobSeekerDashboard";
import JobApplications from "./pages/employee/JobApplications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs" element={<JobListing />} />
      <Route path="/for-recruiters" element={<ForRecruiters />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
      <Route path="/jobseeker/profile" element={<JobSeekerProfile />} />
      <Route path="/jobseeker/applications" element={<MyApplications />} />
      <Route path="/jobseeker/skills" element={<MySkills />} />
      <Route path="/jobseeker/experience" element={<MyExperience />} />
      <Route path="/jobseeker/education" element={<MyEducation />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add" element={<EmployeeOnboard />} />
      <Route path="/admin/employees" element={<EmployeeList />} />
      <Route path="/admin/jobseekers" element={<JobSeekerList />} />
      <Route path="/admin/jobs" element={<JobList />} />
      <Route path="/admin/applications" element={<ApplicationList />} />
      <Route path="/admin/skills" element={<SkillList />} />
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      <Route path="/employee/profile" element={<EmployeeProfile />} />
      <Route path="/employee/jobs" element={<MyJobs />} />
      <Route path="/employee/jobs/add" element={<PostJob />} />
      <Route
        path="/employee/jobs/:jobId/applications"
        element={<JobApplications />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
