import React from "react";
import { Link } from "react-router-dom";

import "../../Styles/PetDetails.css";

const EmployeeProfileComponent = ({ employee, dateFunction }) => {
  return (
    <div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png"
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{employee.username}</h4>
                      <p className="text-secondary mb-1">{employee.email}</p>
                      <p className="text-muted font-size-sm">
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
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Role:</h6>
                    <span className="text-secondary">{employee.role}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Salary:</h6>
                    <span className="text-secondary">{employee.salary}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Contract start date:</h6>
                    <span className="text-secondary">
                      {dateFunction(employee.contractStartingDate)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Contract end date:</h6>
                    <span className="text-secondary">
                      {dateFunction(employee.contractEndingDate)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Fullname</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {employee.firstName} {employee.lastName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {employee.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone number</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {employee.phoneNumber}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
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
