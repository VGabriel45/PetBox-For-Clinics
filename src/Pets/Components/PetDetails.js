import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import firebase from "../../Firebase/firebase";
import PetPageHTML from "./PetPageHTML";
import NavigationBar from "../../Navbar/NavigationBar";

export default function PetDetails(props) {
  const {
    match: { params },
  } = props;

  const petId = params.petId;
  const customerId = params.customerId;

  const history = useHistory();
  const [pet, setpet] = useState({});
  const [owner, setowner] = useState({});
  const [meds, setmeds] = useState([]);
  const [healthProblems, sethealthProblems] = useState([]);
  const [petImage, setpetImage] = useState();

  async function getPet() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/pets/${petId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        setpet(res.data);
        getPetImage(res.data.id);
      });
  }

  async function getPetOwner() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        setowner(res.data);
      });
  }

  async function getPetMedicaments() {
    await axios
      .get(`http://localhost:8080/meds/pet/${petId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        setmeds(res.data);
      });
  }

  async function getHealthProblems() {
    await axios
      .get(`http://localhost:8080/healthProblems/pet/${petId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        sethealthProblems(res.data);
      });
  }

  async function deletePet() {
    await axios.delete(
      `http://localhost:8080/customers/${customerId}/pets/${petId}`,
      { headers: authHeader() }
    );
    axios.delete(`http://localhost:8080/delete/${pet.name}`, {
      headers: authHeader(),
    });
    history.push("/pets");
    window.location.reload("/pets");
  }

  async function getPetImage(petId) {
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child(await petId);
    setpetImage(await fileRef.getDownloadURL());
  }

  useEffect(() => {
    getPet();
    getPetOwner();
    getPetMedicaments();
    getHealthProblems();
  }, [petImage]);

  return (
    <React.Fragment>
      <NavigationBar />
      <PetPageHTML
        pet={pet}
        petImage={petImage}
        petOwner={owner}
        meds={meds}
        healthProblems={healthProblems}
        customerId={customerId}
      />
    </React.Fragment>
  );
}
