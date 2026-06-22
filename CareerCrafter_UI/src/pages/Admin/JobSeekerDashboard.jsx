import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarJobSeeker from "../../components/NavbarJobSeeker";

const statusBadge = (status) => {
  const map = {
    APPLIED: "secondary",
    REVIEWED: "info",
    SHORTLISTED: "warning",
    INTERVIEWING: "primary",
    OFFERED: "success",
    REJECTED: "danger",
  };

  return (
    <span className={`badge bg-${map[status] || "secondary"} px-3 py-2`}>
      {status}
    </span>
  );
};

const StatCard = ({ icon, value, label, bg, onClick }) => (
  <div className="col-lg-3 col-md-6">
    <div
      className="card border-0 shadow-sm rounded-4 h-100"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="card-body d-flex align-items-center gap-3">
        <div
          className={`rounded-3 d-flex align-items-center justify-content-center text-white ${bg}`}
          style={{ width: "48px", height: "48px", flexShrink: 0 }}
        >
          <i className={`bi ${icon} fs-5`}></i>
        </div>
        <div>
          <h3 className="fw-bold mb-0">{value}</h3>
          <p className="text-muted mb-0">{label}</p>
        </div>
      </div>
    </div>
  </div>
);

const JobSeekerDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalSkills: 0,
    totalExperiences: 0,
    totalEducations: 0,
  });

  const [applications, setApplications] = useState([]);

  const getConfig = () => ({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [profileRes, statsRes, appsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/user/profile", getConfig()),
          axios.get("http://localhost:8080/api/user/stats", getConfig()),
          axios.get(
            "http://localhost:8080/api/application/my-applications?page=0&size=5",
            getConfig(),
          ),
        ]);

        setProfile(profileRes.data);
        setStats(statsRes.data);
        setApplications(appsRes.data.applicationPostList || []);
      } catch (error) {
        console.error(error?.response);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="d-flex bg-light min-vh-100">
      <NavbarJobSeeker />

      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        {/* Top bar */}
        <div className="d-flex justify-content-end align-items-center gap-3 bg-white border-bottom px-4 py-3">
          <span className="text-muted">Welcome, {profile?.name || "..."}</span>
          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
            style={{ width: "38px", height: "38px" }}
          >
            {profile?.name?.charAt(0)?.toUpperCase() || "J"}
          </div>
        </div>

        <div className="px-4 py-4">
          {/* Page header */}
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
            <div>
              <h2 className="fw-bold mb-1">Job Seeker Dashboard</h2>
              <p className="text-muted mb-0">
                Track your applications and grow your profile.
              </p>
            </div>

            <button
              className="btn btn-outline-primary px-4"
              onClick={() => navigate("/jobseeker/profile")}
            >
              Edit Profile
            </button>
          </div>

          {/* Statistics */}
          <div className="row g-4 mb-4">
            <StatCard
              icon="bi-send-fill"
              value={stats.totalApplications}
              label="My Applications"
              bg="bg-primary"
              onClick={() => navigate("/jobseeker/applications")}
            />
            <StatCard
              icon="bi-award-fill"
              value={stats.totalSkills}
              label="Skills"
              bg="bg-success"
              onClick={() => navigate("/jobseeker/skills")}
            />
            <StatCard
              icon="bi-briefcase-fill"
              value={stats.totalExperiences}
              label="Experience"
              bg="bg-warning"
              onClick={() => navigate("/jobseeker/experience")}
            />
            <StatCard
              icon="bi-mortarboard-fill"
              value={stats.totalEducations}
              label="Education"
              bg="bg-danger"
              onClick={() => navigate("/jobseeker/education")}
            />
          </div>

          {/* Recent Applications */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Recent Applications</h5>

                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate("/jobseeker/applications")}
                >
                  View All →
                </button>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-5">
                  <h6 className="text-muted">No applications submitted yet</h6>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {applications.map((app, index) => (
                    <div key={index} className="border rounded-4 p-3 bg-white">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                          <h6 className="fw-bold mb-1">
                            {app.jobTitle || "Job Position"}
                          </h6>

                          <p className="text-muted mb-0">
                            {app.companyName || "Company"}
                          </p>
                        </div>

                        {statusBadge(app.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
