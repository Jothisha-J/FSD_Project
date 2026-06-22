import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import {
  getAllEmployees,
  deleteEmployee,
} from "../../store/action/EmployeeAction";

const PAGE_SIZE = 7;

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const employees = useSelector((state) => state.employees?.employees) ?? [];

  const [searchCompany, setSearchCompany] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const handleDelete = (email) => {
    dispatch(deleteEmployee(email));
  };

  const filteredEmployees = employees.filter((employee) => {
    const companyMatch = (employee.CompanyName || "")
      .toLowerCase()
      .includes(searchCompany.toLowerCase());

    const emailMatch = (employee.email || "")
      .toLowerCase()
      .includes(searchEmail.toLowerCase());

    return companyMatch && emailMatch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / PAGE_SIZE),
  );

  const paginatedEmployees = filteredEmployees.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  return (
    <div
      className="d-flex bg-light"
      style={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <AdminSidebar />

      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <div
          className="d-flex justify-content-end align-items-center px-4 bg-white border-bottom"
          style={{ height: "70px" }}
        >
          <span className="me-3 text-muted">Welcome, {username}</span>

          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
            style={{
              width: 40,
              height: 40,
            }}
          >
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Recruiters</h2>
              <p className="text-muted mb-0">Manage recruiter accounts.</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/add")}
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              Add Employee
            </button>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company Name</th>
                      <th>Email</th>
                      <th className="text-end">Action</th>
                    </tr>

                    <tr>
                      <td></td>

                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search company..."
                          value={searchCompany}
                          onChange={(e) => {
                            setSearchCompany(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search email..."
                          value={searchEmail}
                          onChange={(e) => {
                            setSearchEmail(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>

                      <td></td>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedEmployees.length > 0 ? (
                      paginatedEmployees.map((employee, index) => (
                        <tr key={`${employee.email}-${index}`}>
                          <td>{page * PAGE_SIZE + index + 1}</td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: 36,
                                  height: 36,
                                }}
                              >
                                <i className="bi bi-building"></i>
                              </div>

                              <span>{employee.CompanyName || "-"}</span>
                            </div>
                          </td>

                          <td>{employee.email || "-"}</td>

                          <td className="text-end">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(employee.email)}
                            >
                              <i className="bi bi-trash-fill me-1"></i>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-4">
                          No recruiters found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  Showing{" "}
                  {filteredEmployees.length === 0 ? 0 : page * PAGE_SIZE + 1} to{" "}
                  {Math.min((page + 1) * PAGE_SIZE, filteredEmployees.length)}{" "}
                  of {filteredEmployees.length} entries
                </small>

                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({
                      length: totalPages,
                    }).map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${page === i ? "active" : ""}`}
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
                      className={`page-item ${
                        page + 1 >= totalPages ? "disabled" : ""
                      }`}
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

export default EmployeeList;
