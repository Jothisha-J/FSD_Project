import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 bg-white border-bottom"
      style={{ height: "70px" }}
    >
      <div>
        <h6 className="mb-0 fw-semibold">Admin Panel</h6>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">Welcome, {username}</span>

        <div
          className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
          }}
        >
          {username?.charAt(0).toUpperCase()}
        </div>

        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          <i className="bi bi-box-arrow-right me-1"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
