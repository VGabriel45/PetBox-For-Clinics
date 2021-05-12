import React from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

export default function AddPersons(props) {
  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.post("http://localhost:8080/customers", {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      address: data.get("address"),
      phoneNumber: data.get("phoneNumber"),
      gender: data.get("gender"),
      age: data.get("age"),
      lastSeen: new Date(),
    });
    let imageData = new FormData();
    imageData.append("file", data.get("image"));
    axios.post(
      `http://localhost:8080/upload/customer/${data.get("name")}`,
      imageData
    );
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
      <h1>Add customer</h1>
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
        <div>
          <input type="file" className="form-control" name="image" />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
}
