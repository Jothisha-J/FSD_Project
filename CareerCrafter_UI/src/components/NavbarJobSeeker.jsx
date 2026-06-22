import { Link, useLocation, useNavigate } from "react-router-dom";

const NavbarJobSeeker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Dashboard", path: "/jobseeker/dashboard", icon: "bi-grid-fill" },
    { label: "My Profile", path: "/jobseeker/profile", icon: "bi-person-fill" },
    {
      label: "My Applications",
      path: "/jobseeker/applications",
      icon: "bi-send-fill",
    },
    { label: "My Skills", path: "/jobseeker/skills", icon: "bi-award-fill" },
    {
      label: "My Experience",
      path: "/jobseeker/experience",
      icon: "bi-briefcase-fill",
    },
    {
      label: "My Education",
      path: "/jobseeker/education",
      icon: "bi-mortarboard-fill",
    },
    { label: "Jobs", path: "/jobs", icon: "bi-search" },
  ];

  return (
    <div
      className="d-flex flex-column bg-white border-end vh-100 position-sticky top-0 px-3 py-4"
      style={{ width: "260px", flexShrink: 0, overflowY: "auto" }}
    >
      {/* Brand */}
      <div className="mb-4 px-2">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-briefcase-fill text-primary fs-4"></i>
          <span className="fw-bold fs-5 text-primary">CareerCrafter</span>
        </div>
        <small className="text-muted ps-4">Job Seeker Panel</small>
      </div>

      {/* Nav links */}
      <ul className="nav flex-column gap-1 flex-grow-1">
        {navItems.map(({ label, path, icon }) => (
          <li className="nav-item" key={path}>
            <Link
              to={path}
              className={`nav-link d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-medium ${
                isActive(path) ? "bg-primary text-white" : "text-dark"
              }`}
            >
              <i className={`bi ${icon}`}></i>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 mt-3"
        type="button"
        onClick={logout}
      >
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </div>
  );
};

export default NavbarJobSeeker;
