import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeSidebar from "../../components/EmployeeSidebar";

const EmployeeProfile = () => {
  const [form, setForm] = useState({
    CompanyName: "",
    email: "",
    description: "",
    website: "",
    industry: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validatePassword = (password) => {
    if (password.length < 8) return "At least 8 characters.";
    if (!/[A-Z]/.test(password)) return "At least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "At least one lowercase letter.";
    if (!/[0-9]/.test(password)) return "At least one number.";
    if (!/[!@#$%^&*]/.test(password))
      return "At least one special character (!@#$%^&*).";
    return null;
  };

  const handleChangePassword = async () => {
    setPasswordErr("");
    setPasswordMsg("");

    const error = validatePassword(passwordForm.newPassword);
    if (error) {
      setPasswordErr(error);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordErr("Passwords do not match.");
      return;
    }

    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      await axios.put(
        "http://localhost:8080/api/employee/change-password?currentPassword=" +
          passwordForm.currentPassword +
          "&newPassword=" +
          passwordForm.newPassword,
        {},
        config,
      );
      setPasswordMsg("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowChangePassword(false);
      setTimeout(() => setPasswordMsg(""), 3000);
    } catch (err) {
      setPasswordErr(err?.response?.data ?? "Current password is incorrect.");
    }
  };

  const fetchProfile = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const response = await axios.get(
        "http://localhost:8080/api/employee/profile",
        config,
      );
      const { CompanyName, email, description, website, industry, location } =
        response.data;
      setForm({
        CompanyName,
        email,
        description: description ?? "",
        website: website ?? "",
        industry: industry ?? "",
        location: location ?? "",
      });
    } catch (err) {
      console.error(err?.response);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      await axios.put(
        "http://localhost:8080/api/employee/update",
        form,
        config,
      );
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err?.response);
    }
  };

  return (
    <div
      className="d-flex bg-light"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <EmployeeSidebar />

      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        {/* Header */}
        <div className="d-flex justify-content-end align-items-center px-4 py-3 bg-white border-bottom shadow-sm">
          <span className="me-3 text-muted fw-semibold">
            Welcome, {username}
          </span>

          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
            style={{ width: 40, height: 40 }}
          >
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="container-fluid p-4">
          {/* Profile Banner */}
          <div className="card border-0 shadow-sm mb-4 overflow-hidden">
            <div
              style={{
                height: "120px",
                background: "linear-gradient(135deg, #0d6efd 0%, #4f8dfd 100%)",
              }}
            ></div>

            <div className="card-body">
              <div
                className="rounded-circle bg-white shadow d-flex align-items-center justify-content-center fw-bold text-primary"
                style={{
                  width: "90px",
                  height: "90px",
                  fontSize: "32px",
                  marginTop: "-60px",
                  border: "4px solid white",
                }}
              >
                {form.CompanyName?.charAt(0)?.toUpperCase()}
              </div>

              <h3 className="fw-bold mt-3 mb-1">
                {form.CompanyName || "Company Name"}
              </h3>

              <p className="text-muted mb-0">{form.email}</p>
            </div>
          </div>

          {message && (
            <div className="alert alert-success shadow-sm">{message}</div>
          )}

          {/* Company Profile */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-building me-2"></i>
                Company Information
              </h5>
            </div>

            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.CompanyName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        CompanyName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.website}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        website: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Industry</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.industry}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        industry: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.location}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        location: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Company Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="5"
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <button className="btn btn-primary px-4" onClick={handleUpdate}>
                  <i className="bi bi-check-circle me-2"></i>
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold mb-1">
                    <i className="bi bi-shield-lock me-2"></i>
                    Security Settings
                  </h5>
                  <small className="text-muted">
                    Change your account password
                  </small>
                </div>

                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setShowChangePassword(!showChangePassword);
                    setPasswordErr("");
                    setPasswordMsg("");
                  }}
                >
                  {showChangePassword ? "Cancel" : "Change Password"}
                </button>
              </div>
            </div>

            {showChangePassword && (
              <div className="card-body p-4">
                {passwordMsg && (
                  <div className="alert alert-success">{passwordMsg}</div>
                )}

                {passwordErr && (
                  <div className="alert alert-danger">{passwordErr}</div>
                )}

                <div className="row g-4">
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Current Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      New Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                    />

                    <div className="border rounded p-3 bg-light mt-3">
                      {[
                        {
                          test: passwordForm.newPassword.length >= 8,
                          label: "At least 8 characters",
                        },
                        {
                          test: /[A-Z]/.test(passwordForm.newPassword),
                          label: "One uppercase letter",
                        },
                        {
                          test: /[a-z]/.test(passwordForm.newPassword),
                          label: "One lowercase letter",
                        },
                        {
                          test: /[0-9]/.test(passwordForm.newPassword),
                          label: "One number",
                        },
                        {
                          test: /[!@#$%^&*]/.test(passwordForm.newPassword),
                          label: "One special character",
                        },
                      ].map((rule, i) => (
                        <div
                          key={i}
                          className="d-flex align-items-center gap-2 mb-2"
                        >
                          <i
                            className={`bi ${
                              rule.test
                                ? "bi-check-circle-fill text-success"
                                : "bi-circle text-muted"
                            }`}
                          ></i>

                          <span
                            className={
                              rule.test ? "text-success" : "text-muted"
                            }
                          >
                            {rule.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  className="btn btn-primary mt-4 px-4"
                  onClick={handleChangePassword}
                >
                  <i className="bi bi-shield-check me-2"></i>
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
