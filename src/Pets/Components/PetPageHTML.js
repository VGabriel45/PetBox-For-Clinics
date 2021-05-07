import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PetPageLogic from "./PetPageLogic";
import "../../Styles/PetDetails.css";
import PetVaccine from "./MicroComponents/PetVaccine";
import PetSick from "./MicroComponents/PetSick";
import PetAlergic from "./MicroComponents/PetAlergic";
import PetHasInjuries from "./MicroComponents/PetHasInjuries";

const PetPageHTML = ({
  pet,
  petImage,
  petOwner,
  meds,
  healthProblems,
  customerId,
}) => {
  const {
    toggleVaccine,
    toggleSick,
    toggleAlergic,
    toggleHasInjuries,
  } = PetPageLogic({
    pet: pet,
    customerId: customerId,
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "80%",
        }}
      >
        <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img
                      src={
                        petImage
                          ? petImage
                          : "https://img.icons8.com/ios/452/pets--v1.png"
                      }
                      alt="Admin"
                      class="rounded-circle"
                      width="150"
                    />
                    <div class="mt-3">
                      <h4>{pet.name}</h4>

                      <p class="text-secondary mb-1">{pet.type}</p>
                      <Link
                        to={`/customers/${customerId}/pets/${pet.id}/updatePet`}
                      >
                        <button className="btn btn-warning">
                          Update pet information
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mt-3">
                <ul class="list-group list-group-flush">
                  <PetVaccine
                    hasVaccine={pet.hasVaccine}
                    toggleVaccine={toggleVaccine}
                  />
                  <PetSick isSick={pet.isSick} toggleSick={toggleSick} />
                  <PetAlergic
                    isAlergic={pet.isAlergic}
                    toggleAlergic={toggleAlergic}
                  />
                  <PetHasInjuries
                    hasInjuries={pet.hasInjuries}
                    toggleHasInjuries={toggleHasInjuries}
                  />
                  <br />
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Weight: </h6>
                    <span class="text-secondary">{pet.weight} kg</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Age: </h6>
                    <span class="text-secondary">{pet.age} </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Color: </h6>
                    <span class="text-secondary">{pet.color} </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Owner name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <a href={`/customers/${petOwner.id}`}>
                        {petOwner.firstName} {petOwner.lastName}
                      </a>{" "}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Owner email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{petOwner.email}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Owner phone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {petOwner.phoneNumber}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Owner address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {petOwner.address}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div class="row gutters-sm">
                <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3 title">
                        Meds taken:
                      </h6>
                      {meds.length > 0
                        ? meds.map((med) => <p>- {med.name}</p>)
                        : "No meds taken"}
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3 title">
                        Other problems:
                      </h6>
                      {healthProblems.length > 0
                        ? healthProblems.map((hp) => <p>- {hp.name}</p>)
                        : "No problems"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetPageHTML;
