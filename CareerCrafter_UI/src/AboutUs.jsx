import Navbar from "./components/Navbar";

const steps = [
  {
    icon: "bi-person-plus-fill",
    title: "Create an Account",
    desc: "Sign up as a job seeker in just a few minutes and build your profile.",
  },
  {
    icon: "bi-file-earmark-person-fill",
    title: "Build Your Profile",
    desc: "Add your skills, education, and experience to stand out to recruiters.",
  },
  {
    icon: "bi-send-fill",
    title: "Apply for Jobs",
    desc: "Browse thousands of listings and apply with a single click.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container py-5 text-center">
        <h1 className="fw-bold display-5 mb-3">About CareerCrafter</h1>
        <p className="text-muted col-md-8 mx-auto">
          CareerCrafter is a job portal built to connect talented job seekers
          with companies looking to grow their teams. Whether you're searching
          for your next opportunity or your next hire, we make the process
          simple, fast, and effective.
        </p>
      </div>

      <div className="container py-4">
        <h4 className="fw-bold text-center mb-4">How It Works</h4>
        <div className="row g-4">
          {steps.map((s, i) => (
            <div className="col-md-4" key={i}>
              <div className="card shadow-sm h-100 p-4 text-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: 56,
                    height: 56,
                    fontSize: 24,
                    background: "#e7edff",
                    color: "#3b5bdb",
                  }}
                >
                  <i className={`bi ${s.icon}`}></i>
                </div>
                <h6 className="fw-bold">{s.title}</h6>
                <p className="text-muted small mb-0">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-2">For Job Seekers</h5>
              <p className="text-muted mb-0">
                Build a complete profile with your education, experience, and
                skills. Browse jobs filtered by location and role, and track all
                your applications in one dashboard.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-2">For Recruiters</h5>
              <p className="text-muted mb-0">
                Post job openings, review incoming applications, and manage your
                hiring pipeline — all from a centralized dashboard built for
                efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
