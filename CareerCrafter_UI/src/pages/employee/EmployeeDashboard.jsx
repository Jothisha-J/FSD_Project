import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../../components/EmployeeSidebar";

const statusBadge = (status) => {
  const map = {
    APPLIED: "secondary",
    REVIEWED: "info",
    SHORTLISTED: "primary",
    INTERVIEWING: "warning",
    REJECTED: "danger",
    OFFERED: "success",
  };
  return (
    <span className={`badge bg-${map[status] ?? "secondary"}`}>{status}</span>
  );
};

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const username = localStorage.getItem("username");

  const fetchProfile = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const response = await axios.get(
        "http://localhost:8080/api/employee/profile",
        config,
      );
      setProfile(response.data);
      return response.data;
    } catch (err) {
      console.error(err?.response);
    }
  };

  const fetchRecentApplications = async (empId) => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const jobsRes = await axios.get(
        `http://localhost:8080/api/jobpost/getByEmpId/${empId}?page=0&size=1000`,
        config,
      );
      const jobs = jobsRes.data.jobPostDTOList ?? [];

      const allApps = [];
      for (const job of jobs) {
        const appRes = await axios.get(
          `http://localhost:8080/api/application/getByJobId/${job.id}?page=0&size=1000`,
          config,
        );
        const apps = appRes.data.applicationPostList ?? [];
        apps.forEach((app) => allApps.push({ ...app, jobTitle: job.title }));
      }

      setApplications(allApps.slice(0, 5));
    } catch (err) {
      console.error(err?.response);
    }
  };

  useEffect(() => {
    const init = async () => {
      const profileData = await fetchProfile();
      if (profileData?.id) {
        await fetchRecentApplications(profileData.id);
      }
    };
    init();
  }, []);

  return (
    <div
      className="d-flex bg-light"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <EmployeeSidebar />

      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <div className="d-flex justify-content-end align-items-center px-4 py-3 bg-white border-bottom">
          <span className="me-3 text-muted">Welcome, {username}</span>
          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36 }}
          >
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="p-4">
          {/* Company Profile Card */}
          <div className="card shadow-sm p-4 mb-4">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div
                className="rounded-3 bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: 50, height: 50, fontSize: 22 }}
              >
                <i className="bi bi-building"></i>
              </div>
              <div className="flex-grow-1">
                <h5 className="fw-bold mb-1">
                  {profile?.CompanyName ?? "Loading..."}
                </h5>
                <p className="text-muted mb-1">
                  {profile?.industry} · {profile?.location}
                </p>
                {profile?.website && (
                  <a href={profile.website} target="_blank" rel="noreferrer">
                    {profile.website}
                  </a>
                )}
              </div>
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate("/employee/profile")}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-3 mb-4">
            <button
              className="btn btn-primary flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2"
              onClick={() => navigate("/employee/jobs/add")}
            >
              <i className="bi bi-plus-circle-fill"></i>
              Post a New Job
            </button>
            <button
              className="btn btn-outline-primary flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2"
              onClick={() => navigate("/employee/jobs")}
            >
              <i className="bi bi-file-text-fill"></i>
              View My Jobs
            </button>
          </div>

          {/* Recent Applications */}
          <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Recent Applications</h5>
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/employee/jobs")}
              >
                View all →
              </span>
            </div>

            {applications.length === 0 ? (
              <p className="text-muted mb-0">No applications received yet.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {applications.map((app, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between p-3 border rounded-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center border"
                        style={{ width: 40, height: 40 }}
                      >
                        <i className="bi bi-person text-muted"></i>
                      </div>
                      <div>
                        <p className="fw-semibold mb-0">
                          {app.applicantName ?? "Applicant"}
                        </p>
                        <p className="text-muted small mb-0">{app.jobTitle}</p>
                      </div>
                    </div>
                    <div className="text-end">
                      {statusBadge(app.status)}
                      <p className="text-muted small mb-0 mt-1">
                        {app.applicantEmail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
