import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/homepage">
          <img
            src="/images/F1-logo.png"
            alt="F1 logo"
            style={{ width: "100px" }}
          />
        </Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link white-text"
                aria-current="page"
                to="/homepage"
              >
                Hjem
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link white-text" to="/register">
                Registrer Driver
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link white-text" to="/all-drivers">
                Drivers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link white-text" to="/results">
                Race Game
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
