import React from "react";
import LandingPageLogic from "./LandingPageLogic";

import "../Styles/LandingPage.css";
import Navbar from "../Navbar/LandingPageNavbar";

const LandingPage = () => {
  const { redirectToClinicPage, redirectToCustomerPage } = LandingPageLogic();

  return (
    <div>
      <Navbar />
      <section>
        <div className="circle"></div>
        <div className="content">
          <div className="textBox">
            <h2>
              {/* <br /> */}
              Welcome to <span>Petbox</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              esse, quaerat fugit saepe alias commodi quos et ad aliquid quae,
              qui vero voluptatum rem, odio quis dolore similique vitae?
              Pariatur?
            </p>
            <a href="#">Learn more</a>
          </div>

          <div className="imgBox">
            <img
              src="https://i.pinimg.com/originals/d6/11/3b/d6113b031ac40ecc19a85eda0ae55436.png"
              alt="pet"
              className="petImage"
              style={{ marginTop: "-110px" }}
            />
          </div>
        </div>
        <ul className="thumb">
          <li>
            <img
              src="https://cdn2.iconfinder.com/data/icons/general-health-1/24/clinic2-512.png"
              alt="clinicSide"
              onClick={redirectToClinicPage}
            />
          </li>
          <li>
            <img
              src="https://static.thenounproject.com/png/2404351-200.png"
              alt="clientSide"
              onClick={redirectToCustomerPage}
            />
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
