import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import firebase from "../../Firebase/firebase";

export default function PetDetails(props) {
  const {
    match: { params },
  } = props;

  const petId = params.petId;
  const customerId = params.customerId;

  const history = useHistory();
  const [pet, setpet] = useState({});
  const [petImage, setpetImage] = useState();

  async function getPet() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/pets/${petId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        setpet(res.data);
        getPetImage(res.data.id)
      })
  }

  async function deletePet() {
    await axios.delete(
      `http://localhost:8080/customers/${customerId}/pets/${petId}`,
      { headers: authHeader() }
    );
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
  }, [petImage]);

  return (
    <div>
      <h1>
        Pet name: {pet.name} - {pet.type}
      </h1>
      <h1>Pet race: {pet.race}</h1>
      <h1>Pet age: {pet.age}</h1>
      <h1>Pet color: {pet.color}</h1>
      {petImage ? <img src={petImage} alt="" /> : 'No image'}

      <br />
      <button className="btn btn-danger" onClick={deletePet}>
        Delete
      </button>
      <Link to={`/customers/${customerId}/pets/${petId}/updatePet`}>
        <button className="btn btn-warning">Edit</button>
      </Link>
    </div>
  );
}
