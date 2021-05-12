import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import authHeader from "../../Services/auth-header";
import { useHistory } from "react-router-dom";
import NavigationBar from "../../Navbar/NavigationBar";

export default function UpdatePet(props) {
  const {
    match: { params },
  } = props;
  const petId = params.petId;
  const customerId = params.customerId;
  const [pet, setpet] = useState({});
  const [customer, setcustomer] = useState({});
  const [loading, setloading] = useState(false);
  const history = useHistory();

  async function getPet() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/pets/${petId}`, {
        headers: authHeader(),
      })
      .then((res) => setpet(res.data));
  }

  const onChangeHandler = (e) => {
    setpet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setloading(true);
    getPet();
    setloading(false);
  }, []);

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.put(
      `http://localhost:8080/customers/${customerId}/pets/${petId}`,
      {
        id: petId,
        name: data.get("name"),
        type: data.get("type"),
        gender: data.get("gender"),
        race: data.get("race"),
        age: data.get("age"),
        color: data.get("color"),
        weight: data.get("weight"),
        customer: pet.customer,
        lastSeen: new Date(),
      },
      { headers: authHeader() }
    );

    history.push(`/dash`);
    // window.location.reload();
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
        {loading ? (
          <div>
            <span className="spinner-border spinner-border-sm"></span>
            <p>Updating your profile</p>
          </div>
        ) : (
          <React.Fragment>
            <Link to={`/customers/${customerId}/pets/${petId}`}>
              Back to pet
            </Link>
            <h1>Update pet data</h1>
            <form className="form-signin" method="post" onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Pet name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={pet.name}
                  onChange={onChangeHandler}
                />
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
                  value={pet.race}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  className="form-select form-select-sm mb-3"
                  aria-label=".form-select-sm example"
                  id="type"
                  name="type"
                  value={pet.type}
                  onChange={onChangeHandler}
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Bird">Bird</option>
                  <option value="Bird">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
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
                  value={pet.gender}
                  onChange={onChangeHandler}
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
                  value={pet.color}
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
                  value={pet.age}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label">
                  Weight
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={pet.weight}
                  onChange={onChangeHandler}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </React.Fragment>
        )}
      </Container>
    </div>
  );
}
