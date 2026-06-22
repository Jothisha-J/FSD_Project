import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const features = [
  {
    bg: "#e7edff",
    color: "#3b5bdb",
    icon: "bi-file-earmark-plus-fill",
    title: "Post Jobs Easily",
    desc: "Create and publish job openings in minutes, reaching thousands of qualified candidates.",
  },
  {
    bg: "#fdeaea",
    color: "#e03131",
    icon: "bi-people-fill",
    title: "Manage Applications",
    desc: "Review applications, update statuses, and track candidates through your hiring pipeline.",
  },
  {
    bg: "#e6fcf5",
    color: "#0ca678",
    icon: "bi-search",
    title: "Find the Right Talent",
    desc: "Browse candidate profiles filtered by skills, experience, and qualifications.",
  },
  {
    bg: "#f3e8ff",
    color: "#9c36b5",
    icon: "bi-building",
    title: "Company Profile",
    desc: "Showcase your company with a dedicated profile that attracts top candidates.",
  },
];

const ForRecruiters = () => {
  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container py-5 text-center">
        <h1 className="fw-bold display-5 mb-3">
          Hire the right talent, faster
        </h1>
        <p className="text-muted mb-4 col-md-8 mx-auto">
          CareerCrafter connects you with motivated job seekers across the
          country. Post jobs, manage applications, and build your team — all in
          one place.
        </p>
        <Link to="/login" className="btn btn-primary btn-lg rounded-pill px-5">
          Recruiter Login
        </Link>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          {features.map((f, i) => (
            <div className="col-md-3" key={i}>
              <div className="card shadow-sm h-100 p-4 text-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: 56,
                    height: 56,
                    fontSize: 24,
                    background: f.bg,
                    color: f.color,
                  }}
                >
                  <i className={`bi ${f.icon}`}></i>
                </div>
                <h6 className="fw-bold">{f.title}</h6>
                <p className="text-muted small mb-0">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-5">
        <div className="card shadow-sm p-4 text-center bg-primary text-white">
          <h4 className="fw-bold mb-2">Ready to start hiring?</h4>
          <p className="mb-3">
            New companies are onboarded by our admin team. Reach out to get your
            recruiter account set up.
          </p>
          <Link to="/login" className="btn btn-light fw-semibold mx-auto px-5">
            Login to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForRecruiters;
