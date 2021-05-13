import React from "react";

const PetHasInjuries = ({ hasInjuries, toggleHasInjuries }) => {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
        <h6 className="mb-0">Has injuries: </h6>
        {hasInjuries ? (
          <div>
            <span className="text-secondary" style={{ marginRight: "10px" }}>
              Yes
            </span>
            <input
              type="checkbox"
              name="hasInjuries"
              id="hasInjuries"
              onChange={toggleHasInjuries}
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
              name="hasInjuries"
              id="hasInjuries"
              onChange={toggleHasInjuries}
            />
          </div>
        )}
      </li>
    </div>
  );
};

export default PetHasInjuries;
