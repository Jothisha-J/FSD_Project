import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { getAllApplications } from "../../store/action/ApplicationAction";

const PAGE_SIZE = 7;

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

const ApplicationList = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const applications =
    useSelector((state) => state.applications.applications) ?? [];

  const [searchName, setSearchName] = useState("");
  const [searchJob, setSearchJob] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getAllApplications());
  }, [dispatch]);

  const viewResume = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/application/resume/application/" + id,
        { headers: { Authorization: "Bearer " + token } },
      );
      const blob = await response.blob();
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
      console.error(err);
      alert("Unable to load resume.");
    }
  };

  const filtered = applications.filter(
    (app) =>
      (app.applicantName ?? "")
        .toLowerCase()
        .includes(searchName.toLowerCase()) &&
      (app.applicantEmail ?? "")
        .toLowerCase()
        .includes(searchEmail.toLowerCase()) &&
      String(app.applicantPhone ?? "").includes(searchPhone) &&
      (app.jobTitle ?? "").toLowerCase().includes(searchJob.toLowerCase()) &&
      (app.companyName ?? "")
        .toLowerCase()
        .includes(searchCompany.toLowerCase()) &&
      (!searchStatus || app.status === searchStatus),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div
      className="d-flex bg-light"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <AdminSidebar />

      <div className="flex-grow-1 d-flex flex-column">
        <div
          className="d-flex justify-content-end align-items-center px-4 bg-white border-bottom"
          style={{ height: "70px" }}
        >
          <span className="me-3 text-muted">Welcome, {username}</span>
          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40 }}
          >
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Applications</h2>
            <p className="text-muted mb-0">
              View all job applications submitted on the platform.
            </p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Applicant</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Resume</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search name..."
                          value={searchName}
                          onChange={(e) => {
                            setSearchName(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search email..."
                          value={searchEmail}
                          onChange={(e) => {
                            setSearchEmail(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search phone..."
                          value={searchPhone}
                          onChange={(e) => {
                            setSearchPhone(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search job..."
                          value={searchJob}
                          onChange={(e) => {
                            setSearchJob(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search company..."
                          value={searchCompany}
                          onChange={(e) => {
                            setSearchCompany(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={searchStatus}
                          onChange={(e) => {
                            setSearchStatus(e.target.value);
                            setPage(0);
                          }}
                        >
                          <option value="">All Status</option>
                          <option value="APPLIED">Applied</option>
                          <option value="REVIEWED">Reviewed</option>
                          <option value="SHORTLISTED">Shortlisted</option>
                          <option value="INTERVIEWING">Interviewing</option>
                          <option value="OFFERED">Offered</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </td>
                      <td></td>
                    </tr>
                  </thead>

                  <tbody>
                    {paginated.length > 0 ? (
                      paginated.map((app, index) => (
                        <tr key={index}>
                          <td>{page * PAGE_SIZE + index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: 36, height: 36 }}
                              >
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <span>{app.applicantName ?? "N/A"}</span>
                            </div>
                          </td>
                          <td>{app.applicantEmail ?? "N/A"}</td>
                          <td>{app.applicantPhone ?? "N/A"}</td>
                          <td>{app.jobTitle ?? "N/A"}</td>
                          <td>{app.companyName ?? "N/A"}</td>
                          <td>{statusBadge(app.status)}</td>
                          <td>
                            {app.resume && app.resume !== "PENDING" ? (
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => viewResume(app.id)}
                              >
                                <i className="bi bi-file-earmark-pdf me-1"></i>
                                View
                              </button>
                            ) : (
                              <span className="text-muted small">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-4">
                          No applications found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  Showing {filtered.length === 0 ? 0 : page * PAGE_SIZE + 1} to{" "}
                  {Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length} entries
                </small>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li
                      className={"page-item " + (page === 0 ? "disabled" : "")}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <li
                        className={"page-item " + (page === i ? "active" : "")}
                        key={i}
                      >
                        <button
                          className="page-link"
                          onClick={() => setPage(i)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={
                        "page-item " +
                        (page + 1 >= totalPages ? "disabled" : "")
                      }
                    >
                      <button
                        className="page-link"
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
