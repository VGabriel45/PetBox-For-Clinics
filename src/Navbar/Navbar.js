import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthService from "../Services/auth.service";

export default function Navbar() {
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  function logOut() {
    AuthService.logout();
  }

  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
      >
        <div class="container">
          <Link to={"/"} className="navbar-brand">
            {currentUser.username}
          </Link>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto my-2 my-lg-0">
              {/* <li class="nav-item">
                <Link to={"/dash"} className="nav-link">
                  Dasboard
                </Link>
              </li> */}
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link
                      to={`/myProfile/${currentUser.id}`}
                      className="nav-link"
                    >
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
