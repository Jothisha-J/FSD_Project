import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../../components/EmployeeSidebar";

const statusOptions = [
  "APPLIED",
  "REVIEWED",
  "SHORTLISTED",
  "INTERVIEWING",
  "REJECTED",
  "OFFERED",
];

const statusBadge = (status) => {
  const map = {
    APPLIED: "secondary",
    REVIEWED: "info",
    SHORTLISTED: "primary",
    INTERVIEWING: "warning",
    REJECTED: "danger",
    OFFERED: "success",
  };
  return (
    <span className={"badge bg-" + (map[status] ?? "secondary")}>{status}</span>
  );
};

const JobApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const getConfig = () => ({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job details for the header
        const jobResp = await axios.get(
          "http://localhost:8080/api/jobpost/getById/" + jobId,
          getConfig(),
        );
        setJobTitle(jobResp.data.title || "Job");

        // Fetch applications
        const appResp = await axios.get(
          "http://localhost:8080/api/application/getByJobId/" +
            jobId +
            "?page=0&size=1000",
          getConfig(),
        );
        setApplications(appResp.data.applicationPostList || []);
      } catch (err) {
        console.error(err?.response);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const handleStatusChange = async (appId, status) => {
    try {
      await axios.put(
        "http://localhost:8080/api/application/update/" +
          appId +
          "?status=" +
          status,
        {},
        getConfig(),
      );
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status } : app)),
      );
    } catch (err) {
      console.error(err?.response);
    }
  };

  const viewResume = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/application/resume/application/" + id,
        {
          responseType: "blob",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        },
      );
      const contentType = response.headers["content-type"] ?? "application/pdf";
      const blob = new Blob([response.data], { type: contentType });
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.target = "_blank";
      link.rel = "noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(fileURL);
    } catch (err) {
      console.error(err?.response);
      alert("Unable to load resume.");
    }
  };

  return (
    <div
      className="d-flex bg-light"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <EmployeeSidebar />

      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        {/* Top bar */}
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
          {/* Back button + heading */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate("/employee/jobs")}
            >
              <i className="bi bi-arrow-left me-1"></i>Back to My Jobs
            </button>
            <div>
              <h4 className="fw-bold mb-0">Applications</h4>
              {jobTitle && (
                <p className="text-muted small mb-0">For: {jobTitle}</p>
              )}
            </div>
          </div>

          {/* Stats badge */}
          <div className="mb-3">
            <span className="badge bg-primary fs-6">
              {applications.length} Application
              {applications.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-5 text-muted">
              Loading applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="alert alert-light border text-center py-5">
              <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
              No applications received yet.
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {applications.map((app) => (
                <div className="card border-0 shadow-sm p-3" key={app.id}>
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle bg-light border d-flex align-items-center justify-content-center"
                        style={{ width: 48, height: 48, fontSize: 20 }}
                      >
                        <i className="bi bi-person text-muted"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">
                          {app.applicantName ?? "Applicant"}
                        </h6>
                        <small className="text-muted">
                          Application #{app.id}
                        </small>
                      </div>
                    </div>
                    {statusBadge(app.status)}
                  </div>

                  <div className="d-flex flex-wrap gap-4 mt-3">
                    <div>
                      <strong className="small">Email</strong>
                      <p className="text-muted small mb-0">
                        {app.applicantEmail ?? "N/A"}
                      </p>
                    </div>
                    <div>
                      <strong className="small">Phone</strong>
                      <p className="text-muted small mb-0">
                        {app.applicantPhone ?? "N/A"}
                      </p>
                    </div>
                    {app.applicantAddress && (
                      <div>
                        <strong className="small">Address</strong>
                        <p className="text-muted small mb-0">
                          {app.applicantAddress}
                        </p>
                      </div>
                    )}
                    <div className="ms-auto d-flex align-items-end gap-3 flex-wrap">
                      {app.resume ? (
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => viewResume(app.id)}
                        >
                          <i className="bi bi-file-earmark-person me-1"></i>View
                          Resume
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          disabled
                        >
                          No Resume
                        </button>
                      )}
                      <select
                        className="form-select form-select-sm"
                        style={{ width: 160 }}
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app.id, e.target.value)
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplications;
