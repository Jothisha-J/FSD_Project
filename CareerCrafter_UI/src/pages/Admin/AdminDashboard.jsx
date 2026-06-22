import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import SkillsChart from "../../components/SkillsChart";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalUsers: 0,
    totalJobs: 0,
    activeJobs: 0,
    inactiveJobs: 0,
    totalApplications: 0,
    totalSkills: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const response = await axios.get(
        "http://localhost:8080/api/admin/stats",
        config,
      );
      setStats(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      title: "Recruiters",
      value: stats.totalEmployees,
      icon: "bi-people-fill",
      color: "primary",
      route: "/admin/employees",
    },
    {
      title: "Job Seekers",
      value: stats.totalUsers,
      icon: "bi-person-workspace",
      color: "success",
      route: "/admin/jobseekers",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: "bi-briefcase-fill",
      color: "success",
      route: "/admin/jobs",
    },
    {
      title: "Inactive Jobs",
      value: stats.inactiveJobs,
      icon: "bi-briefcase",
      color: "secondary",
      route: "/admin/jobs",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: "bi-file-earmark-text-fill",
      color: "danger",
      route: "/admin/applications",
    },
    {
      title: "Skills",
      value: stats.totalSkills,
      icon: "bi-award-fill",
      color: "info",
      route: "/admin/skills",
    },
  ];

  return (
    <div
      className="d-flex bg-light"
      style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}
    >
      <AdminSidebar />

      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ minWidth: 0, height: "100vh" }}
      >
        <div
          className="d-flex justify-content-end align-items-center px-4 bg-white border-bottom"
          style={{ height: "70px" }}
        >
          <span className="me-3 text-muted">Welcome, {username}</span>
          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40 }}
          >
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Admin Dashboard</h2>
            <p className="text-muted mb-0">
              Overview of platform activity and statistics.
            </p>
          </div>

          <div className="row g-3 flex-nowrap mb-4">
            {cards.map((card) => (
              <div className="col" key={card.title}>
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(card.route)}
                >
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className={
                          "bg-" +
                          card.color +
                          " text-white rounded-3 d-flex align-items-center justify-content-center"
                        }
                        style={{ width: 50, height: 50, fontSize: 20 }}
                      >
                        <i className={"bi " + card.icon}></i>
                      </div>
                      <div>
                        <h4 className="fw-bold mb-1">{card.value}</h4>
                        <small className="text-muted">{card.title}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Skills vs Jobs & Applications</h5>
              <SkillsChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
