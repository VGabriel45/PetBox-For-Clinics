import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";

export default function PetDetails(props) {
  const {
    match: { params },
  } = props;
  const petId = params.petId;
  const customerId = params.customerId;
  const [pet, setpet] = useState({});

  async function getPet() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/pets/${petId}`, {
        headers: authHeader(),
      })
      .then((res) => setpet(res.data));
  }

  async function deletePet() {
    await axios.delete(
      `http://localhost:8080/customers/${customerId}/pets/${petId}`,
      { headers: authHeader() }
    );
  }

  async function updatePet() {
    await axios.put(`/customers/${customerId}/pets/${petId}`, {
      pet,
      headers: authHeader(),
    });
  }

  useEffect(() => {
    getPet();
  }, []);

  return (
    <div>
      <h1>Pet name: {pet.name}</h1>
      <h1>Pet race: {pet.race}</h1>
      <h1>Pet age: {pet.age}</h1>
      <h1>Pet color: {pet.color}</h1>
      <button className="btn btn-danger" onClick={deletePet}>
        Delete
      </button>
      <button className="btn btn-warning" onClick={updatePet}>
        Edit
      </button>
    </div>
  );
}
