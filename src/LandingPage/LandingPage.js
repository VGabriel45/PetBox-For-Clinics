import React from "react";
import LandingPageLogic from "./LandingPageLogic";

import "../Styles/LandingPage.css";

const LandingPage = () => {
  const { redirectToClinicPage, redirectToCustomerPage } = LandingPageLogic();

  return (
    <div>
      {/* <NavigationBar /> */}
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
            />
          </div>
        </div>
        <ul className="thumb">
          <li>
            <img
              src="data:image/png;base64,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"
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
