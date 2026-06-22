import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { getAllJobs } from "../../store/action/JobAction";

const PAGE_SIZE = 7;

const JobList = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const jobs = useSelector((state) => state.jobs.jobs) ?? [];

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchJobType, setSearchJobType] = useState("");
  const [searchExperience, setSearchExperience] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const filtered = jobs.filter((j) => {
    const matchesTitle = j.title
      ?.toLowerCase()
      .includes(searchTitle.toLowerCase());
    const matchesLocation = j.location
      ?.toLowerCase()
      .includes(searchLocation.toLowerCase());
    const matchesJobType = !searchJobType || j.job_type === searchJobType;
    const matchesExperience =
      !searchExperience || Number(j.experience) >= Number(searchExperience);
    return (
      matchesTitle && matchesLocation && matchesJobType && matchesExperience
    );
  });

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
            <h2 className="fw-bold mb-1">Jobs</h2>
            <p className="text-muted mb-0">
              View all job postings available on the platform.
            </p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Experience</th>
                      <th>Salary Range</th>
                      <th>Posted On</th>
                      <th>Last Date</th>
                    </tr>
                    <tr>
                      <td></td>

                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search title..."
                          value={searchTitle}
                          onChange={(e) => {
                            setSearchTitle(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search location..."
                          value={searchLocation}
                          onChange={(e) => {
                            setSearchLocation(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>

                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={searchJobType}
                          onChange={(e) => {
                            setSearchJobType(e.target.value);
                            setPage(0);
                          }}
                        >
                          <option value="">All Types</option>
                          <option value="FULL_TIME">Full Time</option>
                          <option value="PART_TIME">Part Time</option>
                          <option value="INTERNSHIP">Internship</option>
                        </select>
                      </td>

                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={searchExperience}
                          onChange={(e) => {
                            setSearchExperience(e.target.value);
                            setPage(0);
                          }}
                        >
                          <option value="">Any Exp</option>
                          <option value="0">0+ Years</option>
                          <option value="1">1+ Years</option>
                          <option value="2">2+ Years</option>
                          <option value="3">3+ Years</option>
                          <option value="5">5+ Years</option>
                          <option value="10">10+ Years</option>
                        </select>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length > 0 ? (
                      paginated.map((job, index) => (
                        <tr key={index}>
                          <td>{page * PAGE_SIZE + index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: 36, height: 36 }}
                              >
                                <i className="bi bi-briefcase-fill"></i>
                              </div>
                              <span>{job.title}</span>
                            </div>
                          </td>
                          <td>{job.location}</td>
                          <td>
                            <span className="badge bg-light text-dark border">
                              {job.job_type}
                            </span>
                          </td>
                          <td>{job.experience} Years</td>
                          <td>
                            ₹{job.salary_min?.toLocaleString()} - ₹
                            {job.salary_max?.toLocaleString()}
                          </td>
                          <td>{job.posted_on}</td>
                          <td>{job.last_date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-4">
                          No jobs found.
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

export default JobList;
