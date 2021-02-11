import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import authHeader from "../../Services/auth-header";

export default function CustomerProfile(props) {
  const [customer, setcustomer] = useState({});
  const [pets, setpets] = useState([]);
  const [appointments, setappointments] = useState([]);
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;

  async function getCustomer() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}`, {
        headers: authHeader(),
      })
      .then((res) => setcustomer(res.data));
  }

  async function getCustomerPets() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/pets`)
      .then((res) => setpets(res.data), { headers: authHeader() });
  }

  async function getCustomerAppointments() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/appointments`)
      .then((res) => setappointments(res.data), { headers: authHeader() });
  }

  async function deleteCustomer() {
    await axios.delete(`http://localhost:8080/customers/${customerId}`, {
      data: { customer },
      headers: authHeader(),
    });
  }

  async function updateCustomer() {
    await axios.put(`http://localhost:8080/customers/${customerId}`, {
      customer,
      headers: authHeader(),
    });
  }

  useEffect(() => {
    getCustomer();
    getCustomerPets();
    getCustomerAppointments();
  }, []);

  return (
    <div>
      First name: {customer.firstName}
      <br />
      Last name : {customer.lastName}
      <br />
      Gender : {customer.gender}
      <br />
      Address: {customer.address}
      <br />
      Last seen at: {customer.lastSeen}
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
      <button className="btn btn-warning" onClick={updateCustomer}>
        Edit
      </button>
    </div>
  );
}
