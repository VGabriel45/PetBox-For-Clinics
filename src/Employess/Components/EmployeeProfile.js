import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import EmployeeProfileComponent from "./EmployeeProfileComponent";
import NavigationBar from "../../Navbar/NavigationBar";

export default function EmployeeProfile(props) {
  let API_URL = "http://localhost:8080";

  const [employee, setEmployee] = useState({});
  const history = useHistory();

  const {
    match: { params },
  } = props;
  const employeeId = params.employeeId;

  async function getEmployee() {
    await axios
      .get(`${API_URL}/employees/${employeeId}`, {
        headers: authHeader(),
      })
      .then((res) => setEmployee(res.data));
  }

  async function deleteEmployee() {
    await axios.delete(`${API_URL}/employees/${employeeId}`, {
      headers: authHeader(),
    });
    history.push(`/employees`);
    window.location.reload(`/employees`);
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
      <NavigationBar />
      <EmployeeProfileComponent
        employee={employee}
        dateFunction={formatDateWithoutTime}
      />
      <div style={{ marginLeft: "11%" }}>
        <button className="btn btn-danger" onClick={deleteEmployee}>
          Delete
        </button>
      </div>
    </div>
  );
}
