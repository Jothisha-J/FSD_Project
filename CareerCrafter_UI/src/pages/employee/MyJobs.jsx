import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../../components/EmployeeSidebar";

const jobTypeOptions = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "REMOTE",
];

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("all");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // Update modal state
  const [showModal, setShowModal] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [editForm, setEditForm] = useState({
    id: null,
    title: "",
    location: "",
    job_type: "",
    experience: "",
    description: "",
    skills_required: "",
    salary_min: "",
    salary_max: "",
    posted_on: "",
    last_date: "",
    employee_id: null,
    skills_id: null,
  });

  const today = new Date().toISOString().split("T")[0];

  const getConfig = () => ({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const fetchJobs = async () => {
    try {
      const profileResp = await axios.get(
        "http://localhost:8080/api/employee/profile",
        getConfig(),
      );
      const empId = profileResp.data.id;
      const response = await axios.get(
        "http://localhost:8080/api/jobpost/getByEmpId/" +
          empId +
          "?page=0&size=1000",
        getConfig(),
      );
      setJobs(response.data.jobPostDTOList || []);
    } catch (err) {
      console.error(err?.response);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(
        "http://localhost:8080/api/jobpost/delete/" + jobId,
        getConfig(),
      );
      fetchJobs();
    } catch (err) {
      console.error(err?.response);
    }
  };

  const handleEditClick = (e, job) => {
    e.stopPropagation();
    setUpdateMsg("");
    setUpdateError("");
    setEditForm({
      id: job.id,
      title: job.title || "",
      location: job.location || "",
      job_type: job.job_type || "",
      experience: job.experience ?? "",
      description: job.description || "",
      skills_required: job.skills_required || "",
      salary_min: job.salary_min ?? "",
      salary_max: job.salary_max ?? "",
      posted_on: job.posted_on || "",
      last_date: job.last_date || "",
      employee_id: job.employee_id ?? null,
      skills_id: job.skills_id ?? null,
    });
    setShowModal(true);
  };

  const handleEditFormChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateSubmit = async () => {
    setUpdateMsg("");
    setUpdateError("");

    if (
      editForm.last_date &&
      editForm.posted_on &&
      editForm.last_date < editForm.posted_on
    ) {
      setUpdateError("Last date must not be before posted date.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:8080/api/jobpost/update/" + editForm.id,
        {
          title: editForm.title,
          location: editForm.location,
          job_type: editForm.job_type,
          experience: Number(editForm.experience),
          description: editForm.description,
          skills_required: editForm.skills_required,
          salary_min: Number(editForm.salary_min),
          salary_max: Number(editForm.salary_max),
          posted_on: editForm.posted_on,
          last_date: editForm.last_date || null,
          employee_id: editForm.employee_id,
          skills_id: editForm.skills_id,
        },
        getConfig(),
      );
      setUpdateMsg("Job updated successfully!");
      fetchJobs();
      setTimeout(() => {
        setShowModal(false);
        setUpdateMsg("");
      }, 1500);
    } catch (err) {
      console.error(err?.response);
      setUpdateError("Failed to update job. Please try again.");
    }
  };

  const activeJobs = jobs.filter((j) => !j.last_date || j.last_date >= today);
  const inactiveJobs = jobs.filter((j) => j.last_date && j.last_date < today);
  const filteredJobs =
    filter === "active"
      ? activeJobs
      : filter === "inactive"
        ? inactiveJobs
        : jobs;

  return (
    <div
      className="d-flex bg-light"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <EmployeeSidebar />

      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <div className="d-flex justify-content-end align-items-center px-4 py-3 bg-white border-bottom">
          <span className="me-3 text-muted">Welcome, {username}</span>
          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36 }}
          >
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="p-4">
          <h3 className="fw-bold mb-4">My Posted Jobs</h3>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div
                className={
                  "card border-0 shadow-sm text-center p-3 " +
                  (filter === "all" ? "border-primary border" : "")
                }
                style={{ cursor: "pointer" }}
                onClick={() => setFilter("all")}
              >
                <h3 className="fw-bold mb-1">{jobs.length}</h3>
                <p className="text-muted small mb-0">All Jobs</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className={
                  "card border-0 shadow-sm text-center p-3 " +
                  (filter === "active" ? "border-success border" : "")
                }
                style={{ cursor: "pointer" }}
                onClick={() => setFilter("active")}
              >
                <h3 className="fw-bold text-success mb-1">
                  {activeJobs.length}
                </h3>
                <p className="text-muted small mb-0">Active Jobs</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className={
                  "card border-0 shadow-sm text-center p-3 " +
                  (filter === "inactive" ? "border-secondary border" : "")
                }
                style={{ cursor: "pointer" }}
                onClick={() => setFilter("inactive")}
              >
                <h3 className="fw-bold text-secondary mb-1">
                  {inactiveJobs.length}
                </h3>
                <p className="text-muted small mb-0">Inactive Jobs</p>
              </div>
            </div>
          </div>

          {/* Job List */}
          {filteredJobs.length === 0 ? (
            <div className="alert alert-light border">No jobs found.</div>
          ) : (
            filteredJobs.map((job) => {
              const isActive = !job.last_date || job.last_date >= today;
              return (
                <div className="card border-0 shadow-sm mb-3" key={job.id}>
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h5 className="mb-0">{job.title}</h5>
                        <span
                          className={
                            "badge " +
                            (isActive ? "bg-success" : "bg-secondary")
                          }
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-muted mb-1">
                        {job.location} · {job.job_type?.replace("_", " ")} ·{" "}
                        {job.experience}+ Years
                      </p>
                      <p className="text-muted mb-0">
                        ₹{job.salary_min?.toLocaleString()} - ₹
                        {job.salary_max?.toLocaleString()}
                        <span className="ms-3 small">
                          Last date: {job.last_date || "No Expiry"}
                        </span>
                      </p>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={(e) => handleEditClick(e, job)}
                      >
                        <i className="bi bi-pencil me-1"></i>Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </button>

                      {/* ← navigates to the new applications page */}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() =>
                          navigate("/employee/jobs/" + job.id + "/applications")
                        }
                      >
                        <i className="bi bi-people me-1"></i>View Applications
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Update Job Modal ── */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Edit Job Post</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  {updateMsg && (
                    <div className="alert alert-success py-2">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      {updateMsg}
                    </div>
                  )}
                  {updateError && (
                    <div className="alert alert-danger py-2">
                      <i className="bi bi-exclamation-circle-fill me-2"></i>
                      {updateError}
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Job Title
                      </label>
                      <input
                        className="form-control"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Location</label>
                      <input
                        className="form-control"
                        name="location"
                        value={editForm.location}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Job Type</label>
                      <select
                        className="form-select"
                        name="job_type"
                        value={editForm.job_type}
                        onChange={handleEditFormChange}
                      >
                        <option value="">Select type</option>
                        {jobTypeOptions.map((t) => (
                          <option key={t} value={t}>
                            {t.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Experience (years)
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        name="experience"
                        value={editForm.experience}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Min Salary (₹)
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        name="salary_min"
                        value={editForm.salary_min}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Max Salary (₹)
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        name="salary_max"
                        value={editForm.salary_max}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Posted On
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        name="posted_on"
                        value={editForm.posted_on}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Last Date
                      </label>
                      <input
                        className={
                          "form-control " +
                          (editForm.last_date &&
                          editForm.posted_on &&
                          editForm.last_date < editForm.posted_on
                            ? "is-invalid"
                            : "")
                        }
                        type="date"
                        name="last_date"
                        value={editForm.last_date}
                        onChange={handleEditFormChange}
                      />
                      {editForm.last_date &&
                        editForm.posted_on &&
                        editForm.last_date < editForm.posted_on && (
                          <div className="invalid-feedback">
                            Last date must not be before posted date.
                          </div>
                        )}
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Skills Required
                      </label>
                      <input
                        className="form-control"
                        name="skills_required"
                        value={editForm.skills_required}
                        onChange={handleEditFormChange}
                        placeholder="e.g. React, Java, SQL"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows={3}
                        value={editForm.description}
                        onChange={handleEditFormChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateSubmit}
                  >
                    <i className="bi bi-save me-1"></i>Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          />
        </>
      )}
    </div>
  );
};

export default MyJobs;
