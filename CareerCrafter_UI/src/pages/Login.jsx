import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetErr, setResetErr] = useState("");

  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", response.data.username);
      const config = { headers: { Authorization: "Bearer " + token } };
      const userResp = await axios.get(
        "http://localhost:8080/api/auth/user-details",
        config,
      );
      const role = userResp.data.role;
      localStorage.setItem("role", role);
      switch (role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;
        case "EMPLOYEE":
          navigate("/employee/dashboard");
          break;
        case "USER":
          navigate("/jobseeker/dashboard");
          break;
        default:
          setErrMsg("Unknown User Role");
      }
    } catch (err) {
      console.log(err);
      setErrMsg("Invalid Username or Password");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number.";
    if (!/[!@#$%^&*]/.test(password))
      return "Password must contain at least one special character (!@#$%^&*).";
    return null;
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setResetErr("");
    try {
      await axios.post(
        "http://localhost:8080/api/reset-password/verify-email?email=" + email,
      );
      setView("reset");
    } catch (err) {
      setResetErr("No account found with this email address.");
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetErr("");

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setResetErr(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetErr("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/reset-password/reset?email=" +
          email +
          "&newPassword=" +
          newPassword,
      );
      setView("success");
    } catch (err) {
      setResetErr("Failed to reset password. Please try again.");
    }
  };

  const cardContent = () => {
    if (view === "login")
      return (
        <>
          <div className="text-center mb-4">
            <i
              className="bi bi-briefcase-fill text-primary"
              style={{ fontSize: "2.5rem" }}
            ></i>
            <h2 className="fw-bold mt-3 mb-1">CareerCrafter</h2>
            <p className="text-muted">Login to continue</p>
          </div>

          {errMsg && <div className="alert alert-danger">{errMsg}</div>}

          <form onSubmit={onLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="text-end mb-4">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none small"
                onClick={() => {
                  setView("forgot");
                  setResetErr("");
                  setEmail("");
                }}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              style={{ borderRadius: "10px" }}
            >
              Login
            </button>

            <div className="text-center mt-4">
              <span className="text-muted">Don't have an account?</span>
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </div>
          </form>
        </>
      );

    if (view === "forgot")
      return (
        <>
          <div className="text-center mb-4">
            <i
              className="bi bi-envelope-fill text-primary"
              style={{ fontSize: "2.5rem" }}
            ></i>
            <h4 className="fw-bold mt-3 mb-1">Forgot Password</h4>
            <p className="text-muted">Enter your registered email address</p>
          </div>

          {resetErr && <div className="alert alert-danger">{resetErr}</div>}

          <form onSubmit={handleVerifyEmail}>
            <div className="mb-4">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              style={{ borderRadius: "10px" }}
            >
              Verify Email
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => setView("login")}
              >
                ← Back to Login
              </button>
            </div>
          </form>
        </>
      );

    if (view === "reset")
      return (
        <>
          <div className="text-center mb-4">
            <i
              className="bi bi-lock-fill text-primary"
              style={{ fontSize: "2.5rem" }}
            ></i>
            <h4 className="fw-bold mt-3 mb-1">Reset Password</h4>
            <p className="text-muted">Set a new password for your account</p>
          </div>

          {resetErr && <div className="alert alert-danger">{resetErr}</div>}

          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label className="form-label fw-semibold">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              style={{ borderRadius: "10px" }}
            >
              Reset Password
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => setView("forgot")}
              >
                ← Back
              </button>
            </div>
          </form>
        </>
      );

    if (view === "success")
      return (
        <div className="text-center py-3">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "3rem" }}
          ></i>
          <h4 className="fw-bold mt-3 mb-2">Password Reset!</h4>
          <p className="text-muted mb-4">
            Your password has been updated successfully.
          </p>
          <button
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{ borderRadius: "10px" }}
            onClick={() => {
              setView("login");
              setUsername("");
              setPassword("");
              setErrMsg("");
            }}
          >
            Back to Login
          </button>
        </div>
      );
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-lg-5 col-md-7">
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: "16px" }}
          >
            <div className="card-body p-5">{cardContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
