import { useEffect, useState } from "react";
import axios from "axios";
import JobSeekerLayout from "../../components/JobSeekerLayout";

const MyExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company_name: "",
    role: "",
    description: "",
    start_date: "",
    end_date: "",
    currently_working: false,
  });

  const fetchExperiences = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const response = await axios.get(
        "http://localhost:8080/api/experience/my-experiences",
        config,
      );
      setExperiences(response.data.experienceDTOList ?? []);
    } catch (err) {
      console.error(err?.response);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAdd = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      await axios.post(
        "http://localhost:8080/api/experience/add",
        form,
        config,
      );
      setForm({
        company_name: "",
        role: "",
        description: "",
        start_date: "",
        end_date: "",
        currently_working: false,
      });
      fetchExperiences();
    } catch (err) {
      console.error(err?.response);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      await axios.delete(
        "http://localhost:8080/api/experience/delete/" + id,
        config,
      );
      fetchExperiences();
    } catch (err) {
      console.error(err?.response);
    }
  };

  return (
    <JobSeekerLayout>
      <div className="container py-4">
        <h3 className="fw-bold mb-4">My Experience</h3>

        <div className="card border-0 shadow-sm p-4 mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Company Name"
                value={form.company_name}
                onChange={(e) =>
                  setForm({ ...form, company_name: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                disabled={form.currently_working}
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </div>
            <div className="col-md-3 d-flex align-items-center gap-2">
              <input
                type="checkbox"
                checked={form.currently_working}
                onChange={(e) =>
                  setForm({
                    ...form,
                    currently_working: e.target.checked,
                    end_date: "",
                  })
                }
              />
              <label>Currently Working</label>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {experiences.map((exp, index) => (
            <div className="card border-0 shadow-sm p-3" key={index}>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <h6 className="fw-bold mb-1">{exp.role}</h6>
                  <p className="text-muted mb-1">{exp.company_name}</p>
                  <p className="text-muted small mb-0">{exp.description}</p>
                </div>
                <div className="d-flex flex-column align-items-end gap-2">
                  <span className="text-muted small">
                    {exp.start_date} →{" "}
                    {exp.currently_working ? "Present" : exp.end_date}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default MyExperience;
