import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const registerApi = "http://localhost:8080/api/register";

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

  const onRegister = async (e) => {
    e.preventDefault();
    setErrMsg("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrMsg(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match.");
      return;
    }

    const body = {
      username,
      password,
      role: "USER",
    };

    try {
      const response = await axios.post(registerApi, body);
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", "USER");
      navigate("/jobseeker/dashboard");
    } catch (err) {
      console.error(err?.response);
      setErrMsg(
        err?.response?.data?.message ??
          "Registration failed. Try a different username.",
      );
    }
  };
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-lg-5 col-md-7">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "16px",
            }}
          >
            <div className="card-body p-5">
              {/* Header */}
              <div className="text-center mb-4">
                <i
                  className="bi bi-person-plus-fill text-primary"
                  style={{ fontSize: "2.5rem" }}
                ></i>

                <h2 className="fw-bold mt-3 mb-1">CareerCrafter</h2>

                <p className="text-muted">Create your account</p>
              </div>

              {errMsg && <div className="alert alert-danger">{errMsg}</div>}

              <form onSubmit={onRegister}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>

                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    required
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  Sign Up
                </button>

                <div className="text-center mt-4">
                  <span className="text-muted">Already have an account?</span>

                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
