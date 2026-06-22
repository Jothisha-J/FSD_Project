import { Link, useLocation, useNavigate } from "react-router-dom";

const EmployeeSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const links = [
    {
      to: "/employee/dashboard",
      label: "Dashboard",
      icon: "bi-house-door-fill",
    },
    {
      to: "/employee/jobs/add",
      label: "Post Job",
      icon: "bi-plus-circle-fill",
    },
    { to: "/employee/jobs", label: "My Jobs", icon: "bi-briefcase-fill" },
    { to: "/employee/profile", label: "Company Profile", icon: "bi-building" },
  ];

  return (
    <div
      className="bg-white border-end d-flex flex-column p-3"
      style={{ width: 220, minHeight: "100vh" }}
    >
      <div className="d-flex align-items-center gap-2 fw-bold mb-4 px-2">
        <span
          className="bg-primary text-white rounded-2 d-flex align-items-center justify-content-center"
          style={{ width: 32, height: 32 }}
        >
          <i className="bi bi-briefcase-fill"></i>
        </span>
        CareerCrafter
      </div>

      <ul className="nav nav-pills flex-column gap-1 flex-grow-1">
        {links.map((link) => (
          <li className="nav-item" key={link.to}>
            <Link
              to={link.to}
              className={`nav-link d-flex align-items-center gap-2 ${
                location.pathname === link.to ? "active" : "text-dark"
              }`}
            >
              <i className={`bi ${link.icon}`}></i>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        className="btn btn-outline-danger d-flex align-items-center gap-2 mt-3"
        onClick={logout}
      >
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </div>
  );
};

export default EmployeeSidebar;
