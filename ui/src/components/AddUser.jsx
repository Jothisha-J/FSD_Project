import { useState } from "react";
import axios from "axios";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        email,
        phone,
        company,
      };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        body,
      );
      setMessage("User Added Successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
    } catch (error) {
      console.log(error);
      setMessage("Failed to Add User");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <h2>Add User</h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={addUser}>
          Submit
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default AddUser;
