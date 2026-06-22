import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { getAllJobSeekers } from "../../store/action/JobSeekerAction";

const PAGE_SIZE = 7;

const JobSeekerList = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const jobSeekers = useSelector((state) => state.jobSeekers.jobSeekers) ?? [];

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getAllJobSeekers());
  }, [dispatch]);

  const filtered = jobSeekers.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchName.toLowerCase()) &&
      u.email?.toLowerCase().includes(searchEmail.toLowerCase()) &&
      String(u.phone || "").includes(searchPhone) &&
      (u.address || "").toLowerCase().includes(searchAddress.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

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
            {username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Job Seekers</h2>
            <p className="text-muted mb-0">
              View registered job seekers on the platform.
            </p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Bio</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search name..."
                          value={searchName}
                          onChange={(e) => {
                            setSearchName(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search email..."
                          value={searchEmail}
                          onChange={(e) => {
                            setSearchEmail(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search phone..."
                          value={searchPhone}
                          onChange={(e) => {
                            setSearchPhone(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          className="form-control form-control-sm"
                          placeholder="Search address..."
                          value={searchAddress}
                          onChange={(e) => {
                            setSearchAddress(e.target.value);
                            setPage(0);
                          }}
                        />
                      </td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length > 0 ? (
                      paginated.map((user, index) => (
                        <tr key={index}>
                          <td>{page * PAGE_SIZE + index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: 36, height: 36 }}
                              >
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <span>{user.name}</span>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.phone || "-"}</td>
                          <td>{user.address || "-"}</td>
                          <td style={{ maxWidth: 300 }}>
                            <div className="text-truncate" title={user.bio}>
                              {user.bio || "-"}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                          No job seekers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  Showing {filtered.length === 0 ? 0 : page * PAGE_SIZE + 1} to{" "}
                  {Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length} entries
                </small>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
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
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <li
                        className={"page-item " + (page === i ? "active" : "")}
                        key={i}
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
                      className={
                        "page-item " +
                        (page + 1 >= totalPages ? "disabled" : "")
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerList;
