import { useEffect, useState } from "react";
import axios from "axios";
import JobSeekerLayout from "../../components/JobSeekerLayout";

const statusBadge = (status) => {
  const map = {
    APPLIED: "secondary",
    INTERVIEWING: "primary",
    REVIEWED: "info",
    SHORTLISTED: "primary",
    OFFERED: "success",
    REJECTED: "danger",
  };
  return (
    <span className={"badge bg-" + (map[status] ?? "secondary")}>{status}</span>
  );
};

const PAGE_SIZE = 5;

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0); // 0-indexed, matches backend
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchApplications = async (pageToFetch) => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: { page: pageToFetch, size: PAGE_SIZE },
      };
      const response = await axios.get(
        "http://localhost:8080/api/application/my-applications",
        config,
      );
      setApplications(response.data.applicationPostList ?? []);
      setTotalPages(response.data.TotalPage ?? 0);
      setTotalElements(response.data.TotalElement ?? 0);
    } catch (err) {
      console.error(err?.response);
    }
  };

  useEffect(() => {
    fetchApplications(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      await axios.delete(
        "http://localhost:8080/api/application/delete/" + id,
        config,
      );
      setMessage("Application withdrawn successfully!");

      // If we deleted the last item on a page beyond the first, step back a page
      if (applications.length === 1 && page > 0) {
        setPage((prev) => prev - 1);
      } else {
        fetchApplications(page);
      }

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err?.response);
    }
  };

  const goToPrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const goToNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  return (
    <JobSeekerLayout>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h3 className="fw-bold mb-0">My Applications</h3>
        </div>

        {message && <div className="alert alert-success">{message}</div>}

        {applications.length === 0 ? (
          <div className="alert alert-light border">No applications yet.</div>
        ) : (
          <>
            <div className="d-flex flex-column gap-3">
              {applications.map((app, index) => (
                <div className="card border-0 shadow-sm p-3" key={index}>
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    <div>
                      <h5 className="fw-bold mb-1">{app.jobTitle ?? "Job"}</h5>
                      <p className="text-muted mb-1">{app.companyName}</p>
                      <p className="text-muted small mb-0">
                        Resume: {app.resume}
                      </p>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-2">
                      {statusBadge(app.status)}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(app.id)}
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-4">
                <small className="text-muted">
                  Showing {page * PAGE_SIZE + 1} to{" "}
                  {Math.min((page + 1) * PAGE_SIZE, totalElements)} of{" "}
                  {totalElements} entries
                </small>

                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={goToPrevious}>
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${page === i ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => setPage(i)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      page + 1 >= totalPages ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={goToNext}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </JobSeekerLayout>
  );
};

export default MyApplications;
