import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import AuthService from "../Services/auth.service";

const LandingPageNavbar = () => {
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());
  const history = useHistory();

  function logOut() {
    AuthService.logout();
    history.push("/login");
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img
            src="https://morningbubbles.com/wp-content/uploads/2015/05/PetBox-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      {currentUser ? (
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/dash">
              Dashboard
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light">
                  <button
                    onClick={logOut}
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    Logout
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/landingPage">
              Home
            </a>

            <a className="navbar-item">Documentation</a>

            <a className="navbar-item" href="/clinicPage">
              Use as Clinic
            </a>
            <a className="navbar-item" href="/customerPage">
              Use as Customer
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingPageNavbar;
