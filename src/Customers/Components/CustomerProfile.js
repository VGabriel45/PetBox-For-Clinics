import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import authHeader from "../../Services/auth-header";
import { useHistory } from "react-router-dom";

export default function CustomerProfile(props) {
  const history = useHistory();
  const [customer, setcustomer] = useState({});
  const [pets, setpets] = useState([]);
  const [appointments, setappointments] = useState([]);
  const [loading, setloading] = useState(false);
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;

  async function getCustomer() {
    setloading(true);
    await axios
      .get(`http://localhost:8080/customers/${customerId}`, {
        headers: authHeader(),
      })
      .then((res) => setcustomer(res.data));
    setloading(false);
  }

  async function getCustomerPets() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/pets`, {
        headers: authHeader(),
      })
      .then((res) => setpets(res.data));
  }

  async function getCustomerAppointments() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/appointments`, {
        headers: authHeader(),
      })
      .then((res) => setappointments(res.data));
  }

  async function deleteCustomer() {
    await axios.delete(
      `http://localhost:8080/customers/${customerId}`,
      { headers: authHeader() },
      {
        data: { customer },
      }
    );
    axios.delete(`http://localhost:8080/delete/${customer.username}`, {
      headers: authHeader(),
    });
    history.push("/customers");
  }

  async function updateCustomer() {
    await axios.put(
      `http://localhost:8080/customers/${customerId}`,
      {
        customer,
      },
      { headers: authHeader() }
    );
  }

  function formatDateWithoutTime(date) {
    var parsedDate = new Date(date);
    return parsedDate.toLocaleString();
  }

  useEffect(() => {
    getCustomer();
    getCustomerPets();
    getCustomerAppointments();
  }, []);

  return (
    <div>
      <div>
        <Link to="/dash">Back to dashboard</Link>
        {loading ? (
          "Loading image"
        ) : (
          <div className="mt-5" style={{ width: "50%" }}>
            <img
              src={`data:image/png;base64,${customer.image}`}
              class="img-responsive"
              style={{ width: "50%" }}
              alt=""
            />
          </div>
        )}
        <br />
        Username: {customer.username}
        <br />
        First name: {customer.firstName}
        <br />
        Last name : {customer.lastName}
        <br />
        Gender : {customer.gender}
        <br />
        Address: {customer.address}
        <br />
        Last seen at: {formatDateWithoutTime(customer.lastSeen)}
        <br />
        <ul>
          Pets:
          {pets.map((pet) => (
            <li>
              <Link to={`/customers/${customerId}/pets/${pet.id}`}>
                {pet.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link to={`/customers/${customer.id}/addPet`}>Add new pet</Link>
        <ul>
          Appointments
          {appointments.map((app) => (
            <li>
              <Link to={`/customers/${customer.id}/appointments/${app.id}`}>
                {app.reason}
              </Link>
            </li>
          ))}
        </ul>
        <button className="btn btn-danger" onClick={deleteCustomer}>
          Delete
        </button>
        <Link to={`/customers/${customerId}/updateCustomer`}>
          <button className="btn btn-warning">Edit</button>
        </Link>
      </div>
    </div>
  );
}
