import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import { useHistory, userHistory } from "react-router-dom";

import { Link } from "react-router-dom";

export default function EmployeeProfile(props) {
  const [employee, setEmployee] = useState({});
  const history = useHistory();

  const {
    match: { params },
  } = props;
  const employeeId = params.employeeId;

  async function getEmployee() {
    await axios
      .get(`http://localhost:8080/employees/${employeeId}`, {
        headers: authHeader(),
      })
      .then((res) => setEmployee(res.data));
  }

  async function deleteEmployee() {
    await axios.delete(`http://localhost:8080/employees/${employeeId}`, {
      headers: authHeader(),
    });
    // history.push("/dash");
  }

  function formatDateWithoutTime(date) {
    var parsedDate = new Date(date);
    return parsedDate.toLocaleString();
  }

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div>
      First name: {employee.firstName}
      <br />
      Last name : {employee.lastName}
      <br />
      Email : {employee.email}
      <br />
      Gender : {employee.gender}
      <br />
      Address: {employee.address}
      <br />
      Phone number: {employee.phoneNumber}
      <br />
      Contract started on:{" "}
      {formatDateWithoutTime(employee.contractStartingDate)}
      <br />
      Contract ends on: {formatDateWithoutTime(employee.contractEndingDate)}
      <br />
      Currently working as a {employee.role}
      <br />
      Current salary: {employee.salary}$
      <br />
      <button className="btn btn-danger" onClick={deleteEmployee}>
        Delete
      </button>
      <Link to={`/employees/${employeeId}/updateEmployee`}>
        <button className="btn btn-warning">Edit</button>
      </Link>
    </div>
  );
}
