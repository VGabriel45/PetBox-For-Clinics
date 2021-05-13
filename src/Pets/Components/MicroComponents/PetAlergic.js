import React from "react";

const PetAlergic = ({ isAlergic, toggleAlergic }) => {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 className="mb-0">Is alergic:</h6>
        {isAlergic ? (
          <div>
            <span className="text-secondary" style={{ marginRight: "10px" }}>
              Yes
            </span>
            <input
              type="checkbox"
              name="isAlergic"
              id="isAlergic"
              onChange={toggleAlergic}
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
              name="isAlergic"
              id="isAlergic"
              onChange={toggleAlergic}
            />
          </div>
        )}
      </li>
    </div>
  );
};

export default PetAlergic;
