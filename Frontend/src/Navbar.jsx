import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchableItems = [
    { name: "proccessors", path: "/proccessors" },
    { name: "Systems", path: "/Systems" },
    { name: "AI Accelerators", path: "/Acceleraters" },
    { name: "Network to Edge", path: "/Networks" },
    { name: "FPGAs & Programmable Devices", path: "/PDevices" },
    { name: "Home", path: "/" },
    { name: "Sign Up", path: "/Signup" },
    { name: "Login", path: "/Login" },
    { name: "Talk with Intellect!", path: "/Intellect" },
    { name: "My cart", path: "/Cart" },
    { name: "Profile", path: "/profile" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();

    const match = searchableItems.find((item) =>
      item.name.toLowerCase().includes(query)
    );

    if (match) {
      navigate(match.path);
    } else {
      alert("No matching results found.");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{
        height: "4.5rem",
        background: "linear-gradient(-45deg,white 60%, #0068b5)",
      }}
    >
      <div className="container-fluid">
        <img
          src="/Header_logo.jpeg"
          alt="image"
          style={{ height: "10%", width: "5%" }}
        />

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item m-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
                style={{ fontSize: "1.2rem" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item m-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Signup"
                style={{ fontSize: "1.2rem" }}
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item m-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Login"
                style={{ fontSize: "1.2rem" }}
              >
                Login
              </Link>
            </li>
            <li className="nav-item m-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Intellect"
                style={{ fontSize: "1.2rem" }}
              >
                Talk with Intellect!
              </Link>
            </li>
            <li className="nav-item m-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Cart"
                style={{ fontSize: "1.2rem" }}
              >
                My cart
              </Link>
            </li>
            <li className="nav-item dropdown m-3">
              <a
                className="nav-link dropdown-toggle active"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "1.2rem" }}
              >
                Products
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/proccessors">
                    Processors
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Systems">
                    Systems & Devices
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Acceleraters">
                    AI Accelerators
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Networks">
                    Network to Edge
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/PDevices">
                    FPGAs & Programmable Devices
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-outline"
              style={{
                borderColor: "#0068b5",
                color: "#0068b5",
                marginRight: "1rem",
              }}
              type="submit"
            >
              Search
            </button>
            <Link to="/profile">
              <i className="fa-solid fa-user fs-2"></i>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
