import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchableItems = [
    { name: "processors", path: "/proccessors" },
    { name: "systems", path: "/Systems" },
    { name: "ai accelerators", path: "/Acceleraters" },
    { name: "network to edge", path: "/Networks" },
    { name: "fpgas", path: "/PDevices" },
    { name: "home", path: "/" },
    { name: "sign up", path: "/Signup" },
    { name: "login", path: "/Login" },
    { name: "talk with intellect", path: "/Intellect" },
    { name: "cart", path: "/Cart" },
    { name: "profile", path: "/profile" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();

    const match = searchableItems.find((item) =>
      item.name.toLowerCase().includes(query)
    );

    if (match) {
      navigate(match.path);
      setSearchTerm("");
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
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/Header_logo.jpeg"
            alt="Intel"
            style={{ height: "40px", width: "40px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { label: "Home", to: "/" },
              { label: "Sign Up", to: "/Signup" },
              { label: "Login", to: "/Login" },
              { label: "Talk with Intellect!", to: "/Intellect" },
              { label: "My Cart", to: "/Cart" },
            ].map(({ label, to }, i) => (
              <li className="nav-item m-3" key={i}>
                <Link className="nav-link active" to={to} style={{ fontSize: "1.2rem" }}>
                  {label}
                </Link>
              </li>
            ))}

            <li className="nav-item dropdown m-3">
              <a
                className="nav-link dropdown-toggle active"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                style={{ fontSize: "1.2rem" }}
              >
                Products
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/proccessors">Processors</Link></li>
                <li><Link className="dropdown-item" to="/Systems">Systems & Devices</Link></li>
                <li><Link className="dropdown-item" to="/Acceleraters">AI Accelerators</Link></li>
                <li><Link className="dropdown-item" to="/Networks">Network to Edge</Link></li>
                <li><Link className="dropdown-item" to="/PDevices">FPGAs & Programmable Devices</Link></li>
              </ul>
            </li>
          </ul>

          <form className="d-flex align-items-center" onSubmit={handleSearchSubmit}>
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
              type="submit"
              style={{
                borderColor: "#0068b5",
                color: "#0068b5",
                marginRight: "1rem",
              }}
            >
              Search
            </button>
            <Link to="/profile" title="Profile">
              <i className="fa-solid fa-user fs-2"></i>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
