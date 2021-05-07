import React from "react";

const PetAlergic = ({ isAlergic, toggleAlergic }) => {
  return (
    <>
      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 class="mb-0">Is alergic:</h6>
        {isAlergic ? (
          <div>
            <span class="text-secondary" style={{ marginRight: "10px" }}>
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
            <span class="text-secondary" style={{ marginRight: "10px" }}>
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
    </>
  );
};

export default PetAlergic;
