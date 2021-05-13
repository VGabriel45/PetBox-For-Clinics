import React from "react";

const PetVaccine = ({ hasVaccine, toggleVaccine }) => {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 className="mb-0">Has vaccine:</h6>
        {hasVaccine ? (
          <div>
            <span className="text-secondary" style={{ marginRight: "10px" }}>
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
            <span className="text-secondary" style={{ marginRight: "10px" }}>
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
    </div>
  );
};

export default PetVaccine;
