import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import NavbarJobSeeker from "../../components/NavbarJobSeeker";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/jobpost/getById/" + id,
      );
      setJob(response.data);
    } catch (err) {
      console.error(err?.response);
    }
  };

  const handleApply = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (role !== "USER") {
      setMessage("Only job seekers can apply for jobs.");
      return;
    }

    if (!file) {
      setMessage("Please upload your resume before applying.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const config = {
        headers: { Authorization: "Bearer " + token },
      };

      const applicationResponse = await axios.post(
        "http://localhost:8080/api/application/add",
        { resume: "", userProfileId: 0, jobPostId: job.id },
        config,
      );

      const applicationId = applicationResponse.data;

      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        "http://localhost:8080/api/application/upload/" + applicationId,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setMessage("Application submitted successfully!");
      setFile(null);
    } catch (err) {
      console.error(err?.response);
      setMessage("Failed to apply. You may have already applied for this job.");
    } finally {
      setLoading(false);
    }
  };

  const renderNavbar = () => {
    if (role === "USER") return <NavbarJobSeeker />;
    return <Navbar />;
  };

  if (!job) {
    return (
      <div className="bg-light min-vh-100">
        {renderNavbar()}
        <div className="container py-5 text-center text-muted">
          Loading job details...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <button
          className="btn btn-link text-decoration-none ps-0 mb-3"
          onClick={() => navigate("/jobs")}
        >
          ← Back to Jobs
        </button>

        {message && (
          <div
            className={
              "alert " +
              (message.includes("success") ? "alert-success" : "alert-danger")
            }
          >
            {message}
          </div>
        )}

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between flex-wrap gap-3">
              <div>
                <h2 className="fw-bold mb-2">{job.title}</h2>
                <p className="text-muted mb-3">📍 {job.location}</p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-light text-dark border">
                    {job.job_type?.replace("_", " ")}
                  </span>
                  <span className="badge bg-light text-dark border">
                    {job.experience} Years Experience
                  </span>
                  <span className="badge bg-light text-dark border">
                    ₹{job.salary_min?.toLocaleString()} - ₹
                    {job.salary_max?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{ minWidth: "280px" }}>
                {!isLoggedIn ? (
                  <div className="text-center border rounded p-3 bg-white">
                    <p className="text-muted mb-3">
                      Login to apply for this job
                    </p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => navigate("/login")}
                    >
                      Login to Apply
                    </button>
                  </div>
                ) : role !== "USER" ? (
                  <div className="text-center border rounded p-3 bg-white">
                    <p className="text-muted mb-0">
                      Only job seekers can apply for jobs.
                    </p>
                  </div>
                ) : (
                  <>
                    <label className="form-label fw-semibold">
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      className="form-control mb-3"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button
                      className="btn btn-primary w-100"
                      onClick={handleApply}
                      disabled={loading}
                    >
                      {loading ? "Applying..." : "Apply Now"}
                    </button>
                  </>
                )}
              </div>
            </div>

            <hr className="my-4" />

            <h5 className="fw-bold mb-3">Job Description</h5>
            <p className="text-muted">{job.description}</p>

            {job.skills_required && (
              <>
                <h5 className="fw-bold mt-4 mb-3">Required Skills</h5>
                <div className="d-flex flex-wrap gap-2">
                  {job.skills_required.split(",").map((skill, index) => (
                    <span key={index} className="badge bg-primary">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="row mt-5">
              <div className="col-md-6">
                <div className="border rounded p-3 bg-light">
                  <strong>Posted On</strong>
                  <br />
                  {job.posted_on}
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3 bg-light">
                  <strong>Apply Before</strong>
                  <br />
                  {job.last_date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
