import React from "react";
import authService from "../Auth/Components/Service/auth-service";

const FormSubmitLogic = ({ username, password }) => {
  const login = () => {
    authService.login(username, password);
  };

  return { login };
};

export default FormSubmitLogic;
