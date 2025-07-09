import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    reenteredPassword: "",
    address: "",
  });

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://intel-hackathon.onrender.com/api/profile", {
          withCredentials: true,
        });

        if (res.data.success && res.data.user) {
          const { email, username, address } = res.data.user;
          setFormData((prev) => ({
            ...prev,
            email,
            username,
            address,
          }));
        } else {
          toast.error("Failed to load profile", { position: "top-right" });
        }
      } catch (err) {
        toast.error("Failed to load profile", { position: "top-right" });
        console.error("Profile fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.reenteredPassword) {
      toast.error("Passwords do not match", { position: "top-right" });
      return;
    }

    try {
      const res = await axios.put(
        "https://intel-hackathon.onrender.com/api/update",
        {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          address: formData.address,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully", { position: "bottom-right" });

        setFormData((prev) => ({
          ...prev,
          password: "",
          reenteredPassword: "",
        }));
      } else {
        toast.error(res.data.message || "Failed to update profile", { position: "top-right" });
      }
    } catch (err) {
      toast.error("Update failed", { position: "top-right" });
      console.error("Update error:", err);
    }
  };

  return (
    <div className="p-box">
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 text-center" style={{ background: "whitesmoke", height: "auto", borderRadius: "2rem" }}>
            <i className="fa-solid fa-user mt-4" style={{ fontSize: "5rem" }}></i>
            <form className="mt-2 p-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Re-Enter Password</label>
                <input
                  type="password"
                  name="reenteredPassword"
                  className="form-control"
                  placeholder="Re-enter password"
                  value={formData.reenteredPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary mt-2 w-100">
                Save Details
              </button>
            </form>
            <ToastContainer />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
      <br /><br /><br />
    </div>
  );
}

export default Profile;
