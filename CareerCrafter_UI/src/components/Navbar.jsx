import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getDashboardRoute = () => {
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "EMPLOYEE") return "/employee/dashboard";
    if (role === "USER") return "/jobseeker/dashboard";
    return "/";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
        >
          <span
            className="bg-primary text-white rounded-2 d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32 }}
          >
            <i className="bi bi-briefcase-fill"></i>
          </span>
          CareerCrafter
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto ms-4">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-semibold">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/for-recruiters" className="nav-link">
                For Recruiters
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2 align-items-center">
            {token ? (
              <>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(getDashboardRoute())}
                >
                  Dashboard
                </button>
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
