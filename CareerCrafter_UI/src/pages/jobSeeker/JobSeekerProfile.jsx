import { useEffect, useState } from "react";
import axios from "axios";
import JobSeekerLayout from "../../components/JobSeekerLayout";

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const config = {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/profile",
          config,
        );
        const { name, email, phone, address, bio } = response.data;
        setProfile({ name, email, phone, address, bio });
      } catch (err) {
        console.error(err?.response);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      };
      await axios.put("http://localhost:8080/api/user/update", profile, config);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err?.response);
    }
  };

  return (
    <JobSeekerLayout>
      <div className="container mt-4">
        <h4 className="mb-4">My Profile</h4>
        <div className="card shadow-sm p-4" style={{ maxWidth: 600 }}>
          {["name", "email", "phone", "address", "bio"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                type="text"
                className="form-control"
                value={profile[field] ?? ""}
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
              />
            </div>
          ))}
          {message && <p className="text-success">{message}</p>}
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Profile
          </button>
        </div>
      </div>
    </JobSeekerLayout>
  );
};

export default JobSeekerProfile;
