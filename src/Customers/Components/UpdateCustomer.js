import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import authHeader from "../../Services/auth-header";
import { useHistory } from "react-router-dom";

export default function UpdateCustomer(props) {
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;
  const [customer, setcustomer] = useState({});
  const [loading, setloading] = useState(false);
  const history = useHistory();

  async function getCustomer() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}`, {
        headers: authHeader(),
      })
      .then((res) => setcustomer(res.data));
  }

  const onChangeHandler = (e) => {
    setcustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    axios.put(
      `http://localhost:8080/customers/${customerId}`,
      {
        id: customerId,
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        username: data.get("username"),
        email: data.get("email"),
        address: data.get("address"),
        phoneNumber: data.get("phoneNumber"),
        gender: data.get("gender"),
        age: data.get("age"),
        lastSeen: new Date(),
      },
      { headers: authHeader() }
    );

    history.push("/dash");

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
      {loading ? (
        <div>
          <span className="spinner-border spinner-border-sm"></span>
          <p>Updating your profile</p>
        </div>
      ) : (
          <React.Fragment>
            <Link to={`/customers/${customerId}`}>Back to customer</Link>
            <h1>Update customer data</h1>
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
                  value={customer.firstName}
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
                  value={customer.lastName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
              </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={customer.username}
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
                  value={customer.phoneNumber}
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
                  value={customer.gender}
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
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={customer.email}
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
                  value={customer.address}
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
                  value={customer.age}
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
  );
}
