import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  return (
    <div className="container mt-4">
      <h2>User Management Dashboard</h2>
      <nav className="navbar">
        <NavLink className="nav-link" to="/users">
          User List
        </NavLink>
        <br />
        <NavLink className="nav-link" to="/add-user">
          Add User
        </NavLink>
      </nav>

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
