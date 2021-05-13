import React from "react";

const PetSick = ({ isSick, toggleSick }) => {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 className="mb-0">Is sick:</h6>
        {isSick ? (
          <div>
            <span className="text-secondary" style={{ marginRight: "10px" }}>
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
            <span className="text-secondary" style={{ marginRight: "10px" }}>
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
    </div>
  );
};

export default PetSick;
