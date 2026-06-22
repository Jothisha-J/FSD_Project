import axios from "axios";
import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const EmployeeOnboard = () => {
  const username = localStorage.getItem("username");

  const [employeeData, setEmployeeData] = useState({
    username: "",
    companyName: "",
    email: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const addEmployeeUrl = "http://localhost:8080/api/employee/add";

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const onboardEmployee = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      await axios.post(addEmployeeUrl, employeeData, config);

      setSuccessMsg("Recruiter added successfully");

      setErrMsg("");

      setEmployeeData({
        username: "",
        companyName: "",
        email: "",
      });
    } catch (err) {
      setSuccessMsg("");

      setErrMsg(
        err.response?.data?.message ||
          err.response?.data ||
          "Employee creation failed",
      );
    }
  };

  return (
    <div
      className="d-flex bg-light"
      style={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <AdminSidebar />

      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Bar */}

        <div
          className="d-flex justify-content-end align-items-center px-4 bg-white border-bottom"
          style={{
            height: "70px",
          }}
        >
          <span className="text-muted me-3">Welcome, {username}</span>

          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
            style={{
              width: 40,
              height: 40,
            }}
          >
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Main Content */}

        <div className="p-4">
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Recruiter Onboarding</h2>

            <p className="text-muted">Add a new recruiter account.</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-bold">
                    <i className="bi bi-person-plus-fill me-2 text-primary"></i>
                    Recruiter Details
                  </h5>
                </div>

                <div className="card-body p-4">
                  {successMsg && (
                    <div className="alert alert-success">{successMsg}</div>
                  )}

                  {errMsg && <div className="alert alert-danger">{errMsg}</div>}

                  <form onSubmit={onboardEmployee}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Company Name
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-building"></i>
                        </span>

                        <input
                          type="text"
                          name="companyName"
                          className="form-control"
                          placeholder="Enter company name"
                          value={employeeData.companyName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email</label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-envelope"></i>
                        </span>

                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email address"
                          value={employeeData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Username</label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-person"></i>
                        </span>

                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          placeholder="Enter username"
                          value={employeeData.username}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <button
                      className="btn btn-primary w-100 py-2"
                      type="submit"
                    >
                      <i className="bi bi-person-plus-fill me-2"></i>
                      Add Recruiter
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOnboard;
