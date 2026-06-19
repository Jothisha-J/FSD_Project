import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../store/action/characterAction";

function CharacterList() {
  const dispatch = useDispatch();
  const { characters, totalPages } = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllData(currentPage));
  }, [currentPage]);

  return (
    <div>
      <h1>All Characters with pagination</h1>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Species</th>
              <th scope="col">Origin</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((c, index) => (
              <tr key={c.id ?? index}>
                <th scope="row">{c.id}</th>
                <td>{c.name}</td>
                <td>{c.status}</td>
                <td>{c.species}</td>
                <td>{c.originName}</td>
                <td>{c.locationName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul
          className="pagination justify-content-center"
          style={{ flexWrap: "wrap" }}
        >
          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <li className="page-item" key={pageNum}>
                <button
                  className={`page-link ${pageNum === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              </li>
            ),
          )}

          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CharacterList;
