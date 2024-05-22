import React from "react";
import { Link } from "react-router-dom";
import "./LoginNav.css"; // Import CSS file used for styling LoginNav

const LoginNav: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Fintracker
        </Link>
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/spendings">
                Payments
              </Link>
            </li>
          </ul>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
             
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNav;
