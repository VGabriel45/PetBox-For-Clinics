import React, { useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";

const PetPageLogic = ({ pet, customerId }) => {
  const toggleVaccine = () => {
    axios
      .get(
        `http://localhost:8080/customers/${customerId}/pets/${pet.id}/hasVaccine`,
        {
          headers: authHeader(),
        }
      )
      .then(() => window.location.reload());
  };

  const toggleSick = () => {
    axios
      .get(
        `http://localhost:8080/customers/${customerId}/pets/${pet.id}/isSick`,
        {
          headers: authHeader(),
        }
      )
      .then(() => window.location.reload());
  };

  const toggleAlergic = () => {
    axios
      .get(
        `http://localhost:8080/customers/${customerId}/pets/${pet.id}/isAlergic`,
        {
          headers: authHeader(),
        }
      )
      .then(() => window.location.reload());
  };

  const toggleHasInjuries = () => {
    axios
      .get(
        `http://localhost:8080/customers/${customerId}/pets/${pet.id}/hasInjuries`,
        {
          headers: authHeader(),
        }
      )
      .then(() => window.location.reload());
  };

  return { toggleVaccine, toggleSick, toggleAlergic, toggleHasInjuries };
};

export default PetPageLogic;
