import React, { useState } from "react";
import axios from "axios";
import { Grid, Avatar } from "@material-ui/core";
import authHeader from "../../Services/auth-header";
import { useHistory } from "react-router-dom";
import AuthService from "../../Services/auth.service";
import NavigationBar from "../../Navbar/NavigationBar";

const avatarStyle = {
  backgroundColor: "whitesmoke",
};

export default function AddPet(props) {
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;
  const history = useHistory();
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  async function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    await axios.post(
      `http://localhost:8080/clinic/${currentUser.id}/customers/${customerId}/pets`,
      {
        name: data.get("name"),
        gender: data.get("gender"),
        race: data.get("race"),
        age: data.get("age"),
        color: data.get("color"),
        type: data.get("type"),
        type: data.get("weight"),
      },
      { headers: authHeader() }
    );

    redirect();
  }

  function redirect() {
    history.push("/pets");
  }

  return (
    <div>
      <NavigationBar />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
      >
        <div className="box" style={{ width: "50%" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ margin: "0 auto" }}>Add pet</h1>
          </div>
          <Grid align="center" className="mt-2">
            <Avatar style={avatarStyle}>
              <img
                src="https://cdn4.iconfinder.com/data/icons/pet-shop-14/500/pet_10-512.png"
                alt=""
              />
            </Avatar>
          </Grid>
          <a href={`/customers/${customerId}`}>Back to customer</a>
          <br />
          <hr />
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
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
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
                <option value="hamster">Hamster</option>
                <option value="rabbit">Rabbit</option>
                <option value="bird">Bird</option>
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
              <input
                type="text"
                className="form-control"
                id="race"
                name="race"
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
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Weigth ( in kg )
              </label>
              <input
                type="text"
                className="form-control"
                id="weight"
                name="weight"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
