import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="bg-white border-end d-flex flex-column shadow-sm"
      style={{
        width: "260px",
        minHeight: "100vh",
        flexShrink: 0,
      }}
    >
      <div className="p-4 border-bottom">
        <h4 className="fw-bold text-primary mb-1">
          <i className="bi bi-briefcase-fill me-2"></i>
          CareerCrafter
        </h4>

        <small className="text-muted">Admin Panel</small>
      </div>

      <div className="p-3">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `nav-link rounded px-3 py-3 mb-2 ${
              isActive ? "bg-primary text-white" : "text-dark"
            }`
          }
        >
          <i className="bi bi-grid-fill me-2"></i>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/employees"
          className={({ isActive }) =>
            `nav-link rounded px-3 py-3 mb-2 ${
              isActive ? "bg-primary text-white" : "text-dark"
            }`
          }
        >
          <i className="bi bi-people-fill me-2"></i>
          Recruiters
        </NavLink>

        <NavLink
          to="/admin/jobseekers"
          className={({ isActive }) =>
            `nav-link rounded px-3 py-3 mb-2 ${
              isActive ? "bg-primary text-white" : "text-dark"
            }`
          }
        >
          <i className="bi bi-person-workspace me-2"></i>
          Job Seekers
        </NavLink>

        <NavLink
          to="/admin/jobs"
          className={({ isActive }) =>
            `nav-link rounded px-3 py-3 mb-2 ${
              isActive ? "bg-primary text-white" : "text-dark"
            }`
          }
        >
          <i className="bi bi-briefcase-fill me-2"></i>
          Jobs
        </NavLink>

        <NavLink
          to="/admin/applications"
          className={({ isActive }) =>
            `nav-link rounded px-3 py-3 mb-2 ${
              isActive ? "bg-primary text-white" : "text-dark"
            }`
          }
        >
          <i className="bi bi-file-earmark-text-fill me-2"></i>
          Applications
        </NavLink>

        <NavLink
          to="/admin/skills"
          className={({ isActive }) =>
            `nav-link rounded px-3 py-3 mb-2 ${
              isActive ? "bg-primary text-white" : "text-dark"
            }`
          }
        >
          <i className="bi bi-award-fill me-2"></i>
          Skills
        </NavLink>

        <NavLink
          to="/admin/add"
          className={({ isActive }) =>
            `nav-link rounded px-3 py-3 mb-2 ${
              isActive ? "bg-primary text-white" : "text-dark"
            }`
          }
        >
          <i className="bi bi-people-fill me-1"></i>
          Add Recruiter
        </NavLink>
      </div>

      <div className="mt-auto p-3">
        <button className="btn btn-outline-danger w-100" onClick={logout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
