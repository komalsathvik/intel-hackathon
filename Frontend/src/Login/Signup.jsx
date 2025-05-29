import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    reenteredPassword: "",
    username: "",
    address: "",
  });

  const { email, password, reenteredPassword, username, address } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== reenteredPassword) {
      handleError("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://intel-hackathon.onrender.com/api/signup",
        {
          email,
          password,
          reenteredPassword,
          username,
          address,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Signup failed");
      console.log(error);
    }

    setInputValue({
      email: "",
      password: "",
      reenteredPassword: "",
      username: "",
      address: "",
    });
  };

  return (
    <div className="auth-box">
      <div className="container">
        <div className="row">
          <div className="col-2" />
          <div className="col-8 pt-5">
            <h1 className="text-center mb-4">Sign Up into Intel</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="form-control"
                  placeholder="Enter email"
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  className="form-control"
                  placeholder="Enter username"
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  placeholder="Enter password"
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Re-Enter Password</label>
                <input
                  type="password"
                  name="reenteredPassword"
                  value={reenteredPassword}
                  className="form-control"
                  placeholder="Re-enter password"
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Enter Address</label>
                <textarea
                  name="address"
                  value={address}
                  className="form-control"
                  rows="3"
                  placeholder="Enter address"
                  required
                  onChange={handleOnChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>

              <p className="text-center m-3">
                Already have an account?{" "}
                <b>
                  <a href="/login" style={{ textDecoration: "underline" }}>
                    Sign In
                  </a>
                </b>
              </p>
            </form>
            <ToastContainer />
          </div>
          <div className="col-2" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
