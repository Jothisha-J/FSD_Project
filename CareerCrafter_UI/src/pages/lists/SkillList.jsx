import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import {
  getAllSkills,
  addSkill,
  deleteSkill,
} from "../../store/action/SkillAction";

const SkillList = () => {
  const dispatch = useDispatch();

  const username = localStorage.getItem("username") || "Admin";

  const skills = useSelector((state) => state.skills.skills) || [];
  const totalPages = useSelector((state) => state.skills.totalPages) || 1;
  const totalElements = useSelector((state) => state.skills.totalElements) || 0;

  const [skillName, setSkillName] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 7;

  useEffect(() => {
    dispatch(getAllSkills(page, PAGE_SIZE));
  }, [dispatch, page]);
  const [successMsg, setSuccessMsg] = useState("");

  const handleAdd = async () => {
    if (!skillName.trim()) return;
    try {
      await dispatch(addSkill(skillName));
      setSkillName("");
      setPage(0);
      dispatch(getAllSkills(0, PAGE_SIZE));
      setSuccessMsg("Skill inserted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Failed to add skill:", err);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSkill(id, page));
  };

  const filtered = skills.filter((skill) =>
    skill.name?.toLowerCase().includes(search.toLowerCase()),
  );

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
            {username.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h2 className="fw-bold">Skills</h2>
            <p className="text-muted">
              Manage skills available on the platform.
            </p>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              {successMsg && (
                <div
                  className="alert alert-success alert-dismissible fade show mb-3"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {successMsg}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccessMsg("")}
                  />
                </div>
              )}

              <div className="row g-2 align-items-center">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter skill name"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  />
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-primary text-nowrap"
                    onClick={handleAdd}
                  >
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Search skills..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Skill Name</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.length > 0 ? (
                      filtered.map((skill, index) => (
                        <tr key={skill.id}>
                          <td>{page * PAGE_SIZE + index + 1}</td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="bg-info text-white rounded-circle d-flex justify-content-center align-items-center"
                                style={{ width: 36, height: 36 }}
                              >
                                <i className="bi bi-award-fill"></i>
                              </div>
                              <span>{skill.name}</span>
                            </div>
                          </td>

                          <td className="text-end">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(skill.id)}
                            >
                              <i className="bi bi-trash-fill me-1"></i>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4 text-muted">
                          No skills found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  Showing {filtered.length === 0 ? 0 : page * PAGE_SIZE + 1} to{" "}
                  {Math.min((page + 1) * PAGE_SIZE, totalElements)} of{" "}
                  {totalElements} entries
                </small>

                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(page - 1)}
                    >
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
                    className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillList;
