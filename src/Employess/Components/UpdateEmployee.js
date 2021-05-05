import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import authHeader from "../../Services/auth-header";
import { useHistory } from "react-router-dom";

export default function UpdateEmployee(props) {
  const {
    match: { params },
  } = props;
  const employeeId = params.employeeId;
  const [employee, setEmployee] = useState({});
  const history = useHistory();

  async function getEmployee() {
    await axios
      .get(`http://localhost:8080/employees/${employeeId}`, {
        headers: authHeader(),
      })
      .then((res) => setEmployee(res.data));
  }

  const onChangeHandler = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getEmployee();
  }, []);

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.put(
      `http://localhost:8080/employees/${employeeId}`,
      {
        id: employeeId,
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        address: data.get("address"),
        phoneNumber: data.get("phoneNumber"),
        gender: data.get("gender"),
        age: data.get("age"),
        role: data.get("role"),
        salary: data.get("salary"),
        email: data.get("email"),
        // contractStartingDate: data.get("startDate"),
        // contractEndingDate: data.get("endDate"),
      },
      { headers: authHeader() }
    );
    history.push(`/employees/${employeeId}`);
    window.location.reload(`/employees/${employeeId}`);
  }

  return (
    <Container
      style={{
        border: "white",
        height: "100%",
        width: "50%",
        margin: "auto",
        marginTop: "5%",
      }}
    >
      <Link to={`/employees/${employeeId}`}>Back to employee</Link>
      <h1>Update employee data</h1>
      <form
        className="form-signin"
        method="put"
        // action="/employee"
        onSubmit={submitForm}
      >
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={employee.firstName}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={employee.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={employee.phoneNumber}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-sm example"
            id="gender"
            name="gender"
            value={employee.gender}
            onChange={onChangeHandler}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={employee.email}
            onChange={onChangeHandler}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={employee.address}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={employee.age}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="role"
            value={employee.role}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            value={employee.salary}
            onChange={onChangeHandler}
            type="number"
            min="1"
            step="any"
            className="form-control"
            id="salary"
            name="salary"
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start date
          </label>
          <input
            value={employee.contractStartingDate}
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
          />
          <label htmlFor="endDate" className="form-label">
            End date
          </label>
          <input
            value={employee.contractEndingDate}
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
          />
        </div> */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
}
