import React from "react";

const PetVaccine = ({ hasVaccine, toggleVaccine }) => {
  return (
    <>
      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 class="mb-0">Has vaccine:</h6>
        {hasVaccine ? (
          <div>
            <span class="text-secondary" style={{ marginRight: "10px" }}>
              Yes
            </span>
            <input
              type="checkbox"
              name="hasVaccine"
              id="hasVaccine"
              onChange={toggleVaccine}
              checked
            />
          </div>
        ) : (
          <div>
            <span class="text-secondary" style={{ marginRight: "10px" }}>
              No
            </span>
            <input
              type="checkbox"
              name="hasVaccine"
              id="hasVaccine"
              onChange={toggleVaccine}
            />
          </div>
        )}
      </li>
    </>
  );
};

export default PetVaccine;
