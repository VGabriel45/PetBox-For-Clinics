import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../../Services/auth-header";

const FormValidationLogic = ({ clinicName, password, email }) => {
  const [clinicNameValid, setClinicNameValid] = useState(false);
  const [passwordValid, setpasswordValid] = useState(false);
  const [emailValid, setemailValid] = useState(false);

  useEffect(() => {
    checkForClinicName();
    checkForPassword();
    checkForEmail();
  }, [password, clinicName, email]);

  const checkForClinicName = async () => {
    setClinicNameValid(clinicName.length >= 3 && clinicName.length <= 25);
  };

  const checkForPassword = () => {
    let letterNumberExpression = "S*(S*([a-zA-Z]S*[0-9])|([0-9]S*[a-zA-Z]))S*";
    let letterNumberBoolean = password.match(letterNumberExpression);
    let letterContainsSpacesBoolean = /\s/.test(password);
    setpasswordValid(
      letterNumberBoolean &&
        password.length >= 6 &&
        !letterContainsSpacesBoolean
    );
  };

  const checkForEmail = () => {
    setemailValid(
      email.length >= 13 &&
        (email.includes("@gmail.com") || email.includes("@yahoo.com"))
    );
  };

  return {
    checkForClinicName,
    checkForPassword,
    checkForEmail,
    clinicNameValid,
    passwordValid,
    emailValid,
  };
};

export default FormValidationLogic;
