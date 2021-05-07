import React, { useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";

const PetPageLogic = ({ pet, customerId }) => {
  const [loading, setloading] = useState(false);
  const [medName, setmedName] = useState("");
  const [problemName, setproblemName] = useState("");
  const [showMedInput, setshowMedInput] = useState(false);
  const [showProblemInput, setshowProblemInput] = useState(false);

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

  const addMedicament = () => {
    setloading(true);
    if (medName.length >= 3) {
      axios
        .post(
          `http://localhost:8080/meds/pet/${pet.id}`,
          {
            name: medName,
          },
          { headers: authHeader() }
        )
        .then(() => window.location.reload());
    } else {
      setshowMedInput(false);
    }
  };

  const onChangeMed = (e) => {
    setmedName(e.target.value);
  };

  const toggleMedInput = () => {
    setshowMedInput(true);
  };

  const addProblem = () => {
    if (problemName.length >= 3) {
      axios
        .post(
          `http://localhost:8080/healthProblems/pet/${pet.id}`,
          {
            name: problemName,
          },
          { headers: authHeader() }
        )
        .then(() => window.location.reload());
    } else {
      setshowProblemInput(false);
    }
  };

  const onChangeProblem = (e) => {
    setproblemName(e.target.value);
  };

  const toggleProblemInput = () => {
    setshowProblemInput(true);
  };

  return {
    toggleVaccine,
    toggleSick,
    toggleAlergic,
    toggleHasInjuries,
    toggleMedInput,
    addMedicament,
    onChangeMed,
    showMedInput,
    toggleProblemInput,
    addProblem,
    onChangeProblem,
    showProblemInput,
    loading,
  };
};

export default PetPageLogic;
