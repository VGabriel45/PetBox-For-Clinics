import React, { useState } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import authHeader from "../../Services/auth-header";
import { useHistory, useParams, Link } from "react-router-dom";
import AuthService from "../../Services/auth.service";
import NavigationBar from "../../Navbar/NavigationBar";

export default function AddEmployee() {
  const history = useHistory();
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());
  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.post(
      `http://localhost:8080/clinic/${currentUser.id}/employees`,
      {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        address: data.get("address"),
        phoneNumber: data.get("phoneNumber"),
        email: data.get("email"),
        gender: data.get("gender"),
        age: data.get("age"),
        role: data.get("role"),
        contractStartingDate: data.get("startDate"),
        contractEndingDate: data.get("endDate"),
        salary: data.get("salary"),
      },
      { headers: authHeader() }
    );
    history.push(`/employees`);
  }

  return (
    <div>
      <NavigationBar />
      <Container
        style={{
          border: "white",
          height: "100%",
          width: "50%",
          margin: "auto",
          marginTop: "5%",
        }}
      >
        <h1>Add employee</h1>
        <Link to="/dash">Back to dashboard</Link>
        <form
          className="form-signin"
          method="post"
          action="/customers"
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
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
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input type="text" className="form-control" id="age" name="age" />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <input type="text" className="form-control" id="age" name="role" />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              min="1"
              step="any"
              className="form-control"
              id="salary"
              name="salary"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start date
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
            />
            <label htmlFor="endDate" className="form-label">
              End date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Container>
    </div>
  );
}
