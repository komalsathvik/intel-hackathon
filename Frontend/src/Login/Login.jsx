import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css"; // Optional, if you're using custom styles

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

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
    try {
      const { data } = await axios.post(
        "https://intel-hackathon.onrender.com/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Login failed. Please try again.");
      console.error(error);
    }

    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="auth-box">
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 pt-5">
            <h1 className="text-center mb-5">Login into Intel</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email"
                  required
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Enter Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-2"
                style={{ width: "100%" }}
              >
                Login
              </button>
              <p className="text-center m-3">
                Don't have an account?{" "}
                <b>
                  <Link to="/signup" style={{ textDecoration: "underline" }}>
                    Sign Up
                  </Link>
                </b>
              </p>
            </form>
            <ToastContainer />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
