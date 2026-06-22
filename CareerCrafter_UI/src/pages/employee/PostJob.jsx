import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../../components/EmployeeSidebar";

const PostJob = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");

  const [form, setForm] = useState({
    title: "",
    location: "",
    job_type: "",
    experience: "",
    description: "",
    skills_required: "",
    salary_min: "",
    salary_max: "",
    posted_on: new Date().toISOString().split("T")[0],
    last_date: "",
    skills_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        };
        const profileRes = await axios.get(
          "http://localhost:8080/api/employee/profile",
          config,
        );
        setEmployeeId(profileRes.data.id);
        const skillsRes = await axios.get(
          "http://localhost:8080/api/skills/all/list",
          config,
        );
        setSkills(skillsRes.data ?? []);
      } catch (err) {
        console.error(err?.response);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (form.last_date < form.posted_on) {
      setMessage("Last date must not be before posted date");
      return;
    }

    if (!form.title || !form.location || !form.job_type || !form.last_date) {
      setMessage("Please fill in all required fields.");
      return;
    }
    if (!employeeId) {
      setMessage("Employee profile not loaded yet. Please wait.");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const body = {
        title: form.title,
        location: form.location,
        job_type: form.job_type,
        experience: Number(form.experience) || 0,
        description: form.description,
        skills_required: form.skills_required,
        salary_min: Number(form.salary_min) || 0,
        salary_max: Number(form.salary_max) || 0,
        posted_on: form.posted_on,
        last_date: form.last_date,
        employee_id: employeeId,
        skills_id: form.skills_id ? Number(form.skills_id) : null,
      };
      await axios.post("http://localhost:8080/api/jobpost/add", body, config);
      setMessage("Job posted successfully!");
      setTimeout(() => navigate("/employee/jobs"), 1000);
    } catch (err) {
      console.error(err?.response);
      setMessage("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <div className="mb-4">
            <h3 className="fw-bold">Post a New Job</h3>
            <p className="text-muted">
              Fill in the details below to create a job listing
            </p>
          </div>

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
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Job Title *</label>
                  <input
                    className="form-control"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Location *</label>
                  <input
                    className="form-control"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Job Type *</label>
                  <select
                    className="form-select"
                    value={form.job_type}
                    onChange={(e) =>
                      setForm({ ...form, job_type: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Experience (Years)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.experience}
                    onChange={(e) =>
                      setForm({ ...form, experience: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Primary Skill *</label>
                  <select
                    className="form-select"
                    value={form.skills_id}
                    onChange={(e) =>
                      setForm({ ...form, skills_id: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    {skills.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.skill_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Skills Required (comma separated)
                  </label>
                  <input
                    className="form-control"
                    placeholder="Java, Spring Boot, MySQL"
                    value={form.skills_required}
                    onChange={(e) =>
                      setForm({ ...form, skills_required: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Min Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.salary_min}
                    onChange={(e) =>
                      setForm({ ...form, salary_min: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Max Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.salary_max}
                    onChange={(e) =>
                      setForm({ ...form, salary_max: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Posted On</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.posted_on}
                    onChange={(e) =>
                      setForm({ ...form, posted_on: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Date to Apply </label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.last_date}
                    onChange={(e) =>
                      setForm({ ...form, last_date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="d-grid mt-4">
                <button
                  className="btn btn-primary py-2 fw-semibold"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Posting Job..." : "Post Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
