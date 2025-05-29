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

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://intel-hackathon.onrender.com/api/profile", {
          withCredentials: true,
        });

        // ✅ Use correct key: 'success' instead of 'status'
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.reenteredPassword) {
      toast.error("Passwords do not match", { position: "top-right" });
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:3000/profile/api/update",
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

        // ✅ Reset password fields only
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
          <div className="col-8 text-center" style={{ background: "whitesmoke", height: "80vh", borderRadius: "2rem" }}>
            <i className="fa-solid fa-user mt-3" style={{ fontSize: "6rem" }}></i>
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
                  value={formData.password}
                  placeholder="Enter new password"
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
                  value={formData.reenteredPassword}
                  placeholder="Re-enter password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary mt-2" style={{ width: "100%" }}>
                Save details
              </button>
            </form>
            <ToastContainer />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Profile;
