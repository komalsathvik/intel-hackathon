import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css"; // Optional, your custom CSS

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
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
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://intel-hackathon.onrender.com/api/login",
        { email, password },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      handleError("Login failed. Please try again.");
    } finally {
      setLoading(false);
      setInputValue({ email: "", password: "" });
    }
  };

  return (
    <div className="auth-box">
      <div className="container">
        <div className="row">
          <div className="col-2"></div>

          <div className="col-8 pt-5">
            <h1 className="text-center mb-5">Login into Intel</h1>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
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

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Enter Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter your password"
                  required
                />
                <small
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </small>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary mt-2"
                style={{ width: "100%" }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Link to Signup */}
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
