import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const hanleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Router React
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/uploading">
                  Upload Post
                </Link>
              </li>
            </ul>
            <span 
              className="navbar-text ms-auto text-danger" 
              style={{ cursor: "pointer", fontWeight: 500 }}
              onClick={hanleLogout}>
              Logout
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
