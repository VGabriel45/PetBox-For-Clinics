import React from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import authHeader from "../../Services/auth-header";
import { useHistory } from "react-router-dom";

export default function AddPet(props) {
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;
  const history = useHistory();

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.post(
      `http://localhost:8080/customers/${customerId}/pets`,
      {
        name: data.get("name"),
        gender: data.get("gender"),
        race: data.get("race"),
        age: data.get("age"),
        color: data.get("color"),
      },
      { headers: authHeader() }
    );
    history.push("/pets");
  }

  return (
    <div>
      <Container
        style={{
          border: "white",
          height: "100%",
          width: "50%",
          margin: "auto",
          marginTop: "5%",
        }}
      >
        <h1>Add pet</h1>
        <form
          className="form-signin"
          method="post"
          action="/pets"
          onSubmit={submitForm}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Pet type
            </label>
            <select
              className="form-select form-select-sm mb-3"
              aria-label=".form-select-sm example"
              id="type"
              name="type"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="cat">Hamster</option>
              <option value="cat">Rabbit</option>
              <option value="cat">Bird</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input type="text" className="form-control" id="age" name="age" />
          </div>
          <div className="mb-3">
            <label htmlFor="race" className="form-label">
              Race
            </label>
            <input type="text" className="form-control" id="race" name="race" />
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
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="text"
              className="form-control"
              id="color"
              name="color"
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
