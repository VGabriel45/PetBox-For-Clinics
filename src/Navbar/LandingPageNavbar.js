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
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img
            src="https://morningbubbles.com/wp-content/uploads/2015/05/PetBox-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          class="navbar-burger"
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
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="/dash">
              Dashboard
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">More</a>

              <div class="navbar-dropdown">
                <a class="navbar-item">About</a>
                <a class="navbar-item">Jobs</a>
                <a class="navbar-item">Contact</a>
                <hr class="navbar-divider" />
                <a class="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light">
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
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="/landingPage">
              Home
            </a>

            <a class="navbar-item">Documentation</a>

            <a class="navbar-item" href="/clinicPage">
              Use as Clinic
            </a>
            <a class="navbar-item" href="/customerPage">
              Use as Customer
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingPageNavbar;
