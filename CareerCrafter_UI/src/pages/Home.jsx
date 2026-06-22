import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const iconColors = [
  { bg: "#e7edff", color: "#3b5bdb", icon: "bi-code-slash" },
  { bg: "#fdeaea", color: "#e03131", icon: "bi-briefcase-fill" },
  { bg: "#e6fcf5", color: "#0ca678", icon: "bi-palette-fill" },
  { bg: "#f3e8ff", color: "#9c36b5", icon: "bi-people-fill" },
];

const Home = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/jobpost/getAll?page=0&size=100",
        );
        const today = new Date().toISOString().split("T")[0];
        const activeJobs =
          response.data.jobPostDTOList?.filter(
            (job) => !job.last_date || job.last_date >= today,
          ) ?? [];

        setJobs(activeJobs.slice(0, 4));
        setTotalJobs(activeJobs.length);
      } catch (err) {
        console.error("Error fetching jobs:", err.message, err?.response);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) {
      navigate(`/jobs?keyword=${trimmed}`);
    } else {
      navigate("/jobs");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <style>{`
        .job-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .job-card:hover { transform: translateY(-3px); box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.08) !important; }
      `}</style>

      <Navbar />
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold display-5 mb-3">Find your dream job</h1>
          <p className="text-muted mb-4">
            Discover thousands of job opportunities and take the next step in
            your career.
          </p>
        </div>

        <div className="bg-white rounded-pill shadow-sm d-flex p-3 gap-2">
          <input
            type="text"
            className="form-control form-control-lg border-0 shadow-none"
            placeholder="Search jobs, skills, location..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button
            className="btn btn-primary btn-lg rounded-pill px-5"
            onClick={handleSearch}
          >
            <i className="bi bi-search me-2"></i>
            Search Jobs
          </button>
        </div>
      </div>

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Featured Jobs</h5>
          <span
            className="text-primary text-decoration-none"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/jobs")}
          >
            View all jobs →
          </span>
        </div>

        <div className="row g-3">
          {jobs.map((job, index) => {
            const style = iconColors[index % iconColors.length];
            return (
              <div className="col-md-3" key={job.id ?? index}>
                <div
                  className="card shadow-sm h-100 p-3 job-card"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 40,
                      height: 40,
                      background: style.bg,
                      color: style.color,
                    }}
                  >
                    <i className={`bi ${style.icon}`}></i>
                  </div>
                  <h6 className="fw-bold mb-1">{job.title}</h6>
                  <p className="text-muted small mb-1">{job.location}</p>
                  <p className="text-muted small mb-0">
                    {job.experience} Yrs · {job.job_type?.replace("_", " ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container py-4">
        <div className="card shadow-sm p-4 d-flex flex-row align-items-center gap-4">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 60,
              height: 60,
              fontSize: 24,
              background: "#e7edff",
              color: "#3b5bdb",
            }}
          >
            <i className="bi bi-file-earmark-text-fill"></i>
          </div>
          <div className="border-end pe-4">
            <h3 className="fw-bold mb-0">{totalJobs}+</h3>
            <p className="text-muted mb-0">Jobs Posted</p>
          </div>
          <div className="text-muted">
            Explore a wide range of opportunities from top companies across
            India.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
