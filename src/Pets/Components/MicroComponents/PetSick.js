import React from "react";

const PetSick = ({ isSick, toggleSick }) => {
  return (
    <>
      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 class="mb-0">Is sick:</h6>
        {isSick ? (
          <div>
            <span class="text-secondary" style={{ marginRight: "10px" }}>
              Yes
            </span>
            <input
              type="checkbox"
              name="isSick"
              id="isSick"
              onChange={toggleSick}
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
              name="isSick"
              id="isSick"
              onChange={toggleSick}
            />
          </div>
        )}
      </li>
    </>
  );
};

export default PetSick;
