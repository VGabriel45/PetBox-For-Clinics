import React from "react";
import { Link } from "react-router-dom";

import "../../Styles/PetDetails.css";

const EmployeeProfileComponent = ({ employee, dateFunction }) => {
  return (
    <div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png"
                      alt="Admin"
                      class="rounded-circle"
                      width="150"
                    />
                    <div class="mt-3">
                      <h4>{employee.username}</h4>
                      <p class="text-secondary mb-1">{employee.email}</p>
                      <p class="text-muted font-size-sm">
                        Bay Area, San Francisco, CA
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Link to={`/employees/${employee.id}/updateEmployee`}>
                      <button
                        className="btn btn-warning"
                        style={{ width: "200px" }}
                      >
                        Update employee data
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div class="card mt-3">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Role:</h6>
                    <span class="text-secondary">{employee.role}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Salary:</h6>
                    <span class="text-secondary">{employee.salary}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Contract start date:</h6>
                    <span class="text-secondary">
                      {dateFunction(employee.contractStartingDate)}
                    </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0">Contract end date:</h6>
                    <span class="text-secondary">
                      {dateFunction(employee.contractEndingDate)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Fullname</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {employee.firstName} {employee.lastName}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{employee.email}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone number</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {employee.phoneNumber}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {employee.address}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileComponent;
