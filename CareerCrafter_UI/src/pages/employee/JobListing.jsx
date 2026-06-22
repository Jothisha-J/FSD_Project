import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import NavbarJobSeeker from "../../components/NavbarJobSeeker";

const PAGE_SIZE = 6;

const iconColors = [
  { bg: "#e7edff", color: "#3b5bdb", icon: "bi-code-slash" },
  { bg: "#fdeaea", color: "#e03131", icon: "bi-briefcase-fill" },
  { bg: "#e6fcf5", color: "#0ca678", icon: "bi-palette-fill" },
  { bg: "#f3e8ff", color: "#9c36b5", icon: "bi-people-fill" },
];

const experienceRanges = [
  { label: "Fresher (0-1 yrs)", min: 0, max: 1 },
  { label: "1-3 years", min: 1, max: 3 },
  { label: "3-5 years", min: 3, max: 5 },
  { label: "5-10 years", min: 5, max: 10 },
  { label: "10+ years", min: 10, max: 100 },
];

const JobListing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = localStorage.getItem("role");
  //when the job search is invoked from the home page the keyword param is fetched using this statement
  const [keyword, setKeyword] = useState(
    () => searchParams.get("keyword") || "",
  );
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [skills, setSkills] = useState([]);
  const [jobType, setJobType] = useState("ALL");
  const [expRange, setExpRange] = useState(null);
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(5000000);
  const [sortBy, setSortBy] = useState("recent");
  const [skillId, setSkillId] = useState("");

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/skills/all");
      setSkills(response.data.skillDTOList || []);
    } catch (err) {
      console.error(err);
    }
  };

  //using callback to avoid rerendering of the function each time its invoked
  const fetchJobs = useCallback(async () => {
    try {
      const params = { page, size: PAGE_SIZE, sortBy };

      if (keyword.trim()) params.keyword = keyword.trim();
      if (jobType !== "ALL") params.jobType = jobType;
      if (expRange) {
        params.minExp = expRange.min;
        params.maxExp = expRange.max;
      }
      if (salaryMin > 0) params.salaryMin = salaryMin;
      if (salaryMax < 5000000) params.salaryMax = salaryMax;
      if (skillId !== "" && skillId !== null) params.skillId = Number(skillId);

      const response = await axios.get(
        "http://localhost:8080/api/jobpost/search",
        { params },
      );

      setJobs(response.data.jobPostDTOList || []);
      setTotalPages(response.data.TotalPage);
      setTotalElements(response.data.TotalElements);
    } catch (err) {
      console.error(err);
    }
  }, [keyword, page, jobType, expRange, salaryMin, salaryMax, sortBy, skillId]);

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    const urlKeyword = searchParams.get("keyword") || "";
    setKeyword(urlKeyword);
    setPage(0);
  }, [searchParams]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = () => {
    if (page === 0) {
      fetchJobs();
    } else {
      setPage(0);
    }
  };

  const handleReset = () => {
    setJobType("ALL");
    setExpRange(null);
    setSalaryMin(0);
    setSalaryMax(5000000);
    setSortBy("recent");
    setSkillId("");
    setPage(0);
  };

  return (
    <div className="bg-light min-vh-100">
      <style>{`
        .job-row { transition: all .2s ease; }
        .job-row:hover { transform: translateY(-2px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.08) !important; }
        .filter-sidebar { width: 280px; min-width: 280px; }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; width: 16px; height: 16px;
          border-radius: 50%; background: #0d6efd; cursor: pointer;
          border: 2px solid white; box-shadow: 0 0 0 2px #0d6efd;
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: #0d6efd; cursor: pointer;
          border: 2px solid white; box-shadow: 0 0 0 2px #0d6efd;
        }
      `}</style>

      <Navbar />
      <div className="container-fluid py-4">
        <div className="container">
          {/* Search Bar */}
          <div className="bg-white rounded-pill shadow-sm d-flex p-2 gap-2 mb-4">
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Search jobs, skills, location..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="d-flex gap-4 align-items-start">
            {/* Sidebar */}
            {showSidebar && (
              <div className="filter-sidebar bg-white rounded-4 shadow-sm p-4 flex-shrink-0">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0">Filter & Sort</h6>
                  <button
                    className="btn btn-sm btn-link text-muted p-0"
                    onClick={() => setShowSidebar(false)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                {/* Sort */}
                <div className="mb-4">
                  <label className="fw-semibold small mb-2 d-block">
                    Sort By
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setPage(0);
                    }}
                  >
                    <option value="recent">Most Recent</option>
                    <option value="salary_high">Salary High → Low</option>
                    <option value="salary_low">Salary Low → High</option>
                  </select>
                </div>

                {/* Job Type */}
                <div className="mb-4">
                  <label className="fw-semibold small mb-2 d-block">
                    Job Type
                  </label>
                  {[
                    { label: "All", value: "ALL" },
                    { label: "Full Time", value: "FULL_TIME" },
                    { label: "Part Time", value: "PART_TIME" },
                    { label: "Internship", value: "INTERNSHIP" },
                  ].map((item) => (
                    <div className="form-check mb-2" key={item.value}>
                      <input
                        type="radio"
                        className="form-check-input"
                        checked={jobType === item.value}
                        onChange={() => {
                          setJobType(item.value);
                          setPage(0);
                        }}
                      />
                      <label className="form-check-label small">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <label className="fw-semibold small mb-2 d-block">
                    Skill
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={skillId}
                    onChange={(e) => {
                      setSkillId(e.target.value);
                      setPage(0);
                    }}
                  >
                    <option value="">All Skills</option>
                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <label className="fw-semibold small mb-2 d-block">
                    Experience
                  </label>
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      checked={expRange === null}
                      onChange={() => {
                        setExpRange(null);
                        setPage(0);
                      }}
                    />
                    <label className="form-check-label small">All Levels</label>
                  </div>
                  {experienceRanges.map((item) => (
                    <div className="form-check mb-2" key={item.label}>
                      <input
                        type="radio"
                        className="form-check-input"
                        checked={expRange?.label === item.label}
                        onChange={() => {
                          setExpRange(item);
                          setPage(0);
                        }}
                      />
                      <label className="form-check-label small">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Salary Range */}
                <div className="mb-4">
                  <label className="fw-semibold small mb-2 d-block">
                    Salary Range
                  </label>
                  <p className="small text-muted mb-2">
                    ₹{salaryMin.toLocaleString()} — ₹
                    {salaryMax.toLocaleString()}
                    {salaryMax === 5000000 ? "+" : ""}
                  </p>
                  <div style={{ position: "relative", height: 30 }}>
                    <div
                      style={{
                        position: "absolute",
                        top: 13,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: "#dee2e6",
                        borderRadius: 4,
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 13,
                        left: (salaryMin / 5000000) * 100 + "%",
                        right: ((5000000 - salaryMax) / 5000000) * 100 + "%",
                        height: 4,
                        background: "#0d6efd",
                        borderRadius: 4,
                        zIndex: 2,
                      }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={5000000}
                      step={50000}
                      value={salaryMin}
                      onChange={(e) => {
                        const val = Math.min(
                          Number(e.target.value),
                          salaryMax - 50000,
                        );
                        setSalaryMin(val);
                        setPage(0);
                      }}
                      style={{
                        position: "absolute",
                        width: "100%",
                        top: 10,
                        zIndex: salaryMin > 4500000 ? 5 : 3,
                      }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={5000000}
                      step={50000}
                      value={salaryMax}
                      onChange={(e) => {
                        const val = Math.max(
                          Number(e.target.value),
                          salaryMin + 50000,
                        );
                        setSalaryMax(val);
                        setPage(0);
                      }}
                      style={{
                        position: "absolute",
                        width: "100%",
                        top: 10,
                        zIndex: 4,
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <small className="text-muted">₹0</small>
                    <small className="text-muted">₹50,00,000+</small>
                  </div>
                </div>

                <button
                  className="btn btn-outline-secondary w-100 btn-sm"
                  onClick={handleReset}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Job List */}
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="text-muted mb-0">{totalElements} jobs found</p>
                {!showSidebar && (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setShowSidebar(true)}
                  >
                    <i className="bi bi-funnel me-1"></i>Filters
                  </button>
                )}
              </div>

              <div className="d-flex flex-column gap-3">
                {jobs.length > 0 ? (
                  jobs.map((job, index) => {
                    const style = iconColors[index % iconColors.length];
                    return (
                      <div key={job.id} className="card shadow-sm p-3 job-row">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: 48,
                              height: 48,
                              background: style.bg,
                              color: style.color,
                              fontSize: 20,
                            }}
                          >
                            <i className={"bi " + style.icon}></i>
                          </div>
                          <div className="flex-grow-1">
                            <h6
                              className="fw-bold mb-1"
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate("/jobs/" + job.id)}
                            >
                              {job.title}
                            </h6>
                            <p className="text-muted small mb-1">
                              {job.location}
                            </p>
                            <div className="d-flex flex-wrap gap-2">
                              <span className="badge bg-light text-dark border">
                                {job.job_type?.replace("_", " ")}
                              </span>
                              <span className="badge bg-light text-dark border">
                                {job.experience} Yrs Exp
                              </span>
                              <span className="badge bg-light text-dark border">
                                ₹{job.salary_min?.toLocaleString()} - ₹
                                {job.salary_max?.toLocaleString()}
                              </span>
                            </div>
                            {job.skills_required && (
                              <p className="text-muted small mt-2 mb-0">
                                Skills: {job.skills_required}
                              </p>
                            )}
                          </div>
                          <div className="text-end">
                            <p className="text-muted small mb-2">
                              Apply by {job.last_date || "No Expiry"}
                            </p>
                            <button
                              className="btn btn-primary"
                              onClick={() => navigate("/jobs/" + job.id)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-5 text-muted">
                    <i
                      className="bi bi-search"
                      style={{ fontSize: 48, opacity: 0.3 }}
                    ></i>
                    <p className="mt-3">No jobs found matching your search.</p>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <nav aria-label="Page navigation" className="mt-4">
                  <ul className="pagination justify-content-center">
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
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li
                        className={
                          "page-item " + (page === index ? "active" : "")
                        }
                        key={index}
                      >
                        <button
                          className="page-link"
                          onClick={() => setPage(index)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={
                        "page-item " +
                        (page === totalPages - 1 ? "disabled" : "")
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
