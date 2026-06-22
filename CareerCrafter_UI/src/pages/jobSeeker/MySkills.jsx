import { useEffect, useState } from "react";
import axios from "axios";
import JobSeekerLayout from "../../components/JobSeekerLayout";

const MySkills = () => {
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [form, setForm] = useState({
    id: "",
    proficiency: "",
    certification: "",
  });

  const fetchSkills = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const response = await axios.get(
        "http://localhost:8080/api/user-skills/my-skills",
        config,
      );
      setSkills(response.data.userSkillDtoList ?? []);
    } catch (err) {
      console.error(err?.response);
    }
  };

  const fetchAllSkills = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      const response = await axios.get(
        "http://localhost:8080/api/skills/all/list",
        config,
      );
      setAllSkills(response.data ?? []);
    } catch (err) {
      console.error(err?.response);
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchAllSkills();
  }, []);

  const handleAdd = async () => {
    if (!form.id || !form.proficiency || !form.certification) return;
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      await axios.post(
        "http://localhost:8080/api/user-skills/add",
        {
          id: Number(form.id),
          proficiency: form.proficiency,
          certification: form.certification,
        },
        config,
      );
      setForm({ id: "", proficiency: "", certification: "" });
      fetchSkills();
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
        "http://localhost:8080/api/user-skills/delete/" + id,
        config,
      );
      fetchSkills();
    } catch (err) {
      console.error(err?.response);
    }
  };

  return (
    <JobSeekerLayout>
      <div className="container py-4">
        <h3 className="fw-bold mb-4">My Skills</h3>

        <div className="card border-0 shadow-sm p-4 mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <select
                className="form-select"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
              >
                <option value="">Select Skill</option>
                {allSkills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.skill_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={form.proficiency}
                onChange={(e) =>
                  setForm({ ...form, proficiency: e.target.value })
                }
              >
                <option value="">Select Proficiency</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Certification"
                value={form.certification}
                onChange={(e) =>
                  setForm({ ...form, certification: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {skills.map((skill, index) => (
            <div className="card border-0 shadow-sm p-3" key={index}>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <h6 className="fw-bold mb-1">{skill.skill_name}</h6>
                  <p className="text-muted small mb-0">{skill.certification}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-light text-dark border">
                    {skill.proficiency}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(skill.id)}
                  >
                    Remove
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

export default MySkills;
