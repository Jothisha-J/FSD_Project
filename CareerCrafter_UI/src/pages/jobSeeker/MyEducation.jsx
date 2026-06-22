import { useEffect, useState } from "react";
import axios from "axios";
import JobSeekerLayout from "../../components/JobSeekerLayout";

const MyEducation = () => {
  const [educations, setEducations] = useState([]);
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    currentlyPursuing: false,
  });

  const fetchEducations = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const response = await axios.get(
        "http://localhost:8080/api/education/my-education",
        config,
      );
      setEducations(response.data.educationDTOList ?? []);
    } catch (err) {
      console.error(err?.response);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleAdd = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      await axios.post("http://localhost:8080/api/education/add", form, config);
      setForm({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        currentlyPursuing: false,
      });
      fetchEducations();
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
        "http://localhost:8080/api/education/delete/" + id,
        config,
      );
      fetchEducations();
    } catch (err) {
      console.error(err?.response);
    }
  };

  return (
    <JobSeekerLayout>
      <div className="container py-4">
        <h3 className="fw-bold mb-4">My Education</h3>

        <div className="card border-0 shadow-sm p-4 mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Institution"
                value={form.institution}
                onChange={(e) =>
                  setForm({ ...form, institution: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Degree"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Field of Study"
                value={form.fieldOfStudy}
                onChange={(e) =>
                  setForm({ ...form, fieldOfStudy: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                disabled={form.currentlyPursuing}
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
            <div className="col-md-3 d-flex align-items-center gap-2">
              <input
                type="checkbox"
                checked={form.currentlyPursuing}
                onChange={(e) =>
                  setForm({
                    ...form,
                    currentlyPursuing: e.target.checked,
                    endDate: "",
                  })
                }
              />
              <label>Currently Pursuing</label>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {educations.map((edu, index) => (
            <div className="card border-0 shadow-sm p-3" key={index}>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <h6 className="fw-bold mb-1">
                    {edu.degree} — {edu.fieldOfStudy}
                  </h6>
                  <p className="text-muted mb-1">{edu.institution}</p>
                </div>
                <div className="d-flex flex-column align-items-end gap-2">
                  <span className="text-muted small">
                    {edu.startDate} →{" "}
                    {edu.currentlyPursuing ? "Present" : edu.endDate}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(edu.id)}
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

export default MyEducation;
