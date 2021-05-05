import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import { useHistory } from "react-router-dom";

import firebase from "../../Firebase/firebase";
import CustomerProfileComponent from "./CustomerProfileComponent";
import NavigationBar from "../../Navbar/NavigationBar";

import "../../Styles/CustomerProfile.css";

export default function CustomerProfile(props) {
  const {
    match: { params },
  } = props;

  const history = useHistory();

  const [customer, setcustomer] = useState({});
  const customerId = params.customerId;
  const [customerImage, setcustomerImage] = useState();

  const [pets, setpets] = useState([]);
  const [appointments, setappointments] = useState([]);
  const [questions, setquestions] = useState([]);

  const [loading, setloading] = useState();

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

  async function getCustomerImage() {
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child(await customerId);
    setcustomerImage(await fileRef.getDownloadURL());
  }

  async function getCustomerAppointments() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/appointments`, {
        headers: authHeader(),
      })
      .then((res) => setappointments(res.data));
  }

  async function getCustomerQuestions() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/questions`, {
        headers: authHeader(),
      })
      .then((res) => setquestions(res.data));
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
    getCustomerImage();
  }, []);

  return (
    <div>
      <NavigationBar />
      <CustomerProfileComponent
        customer={customer}
        customerImage={customerImage}
        pets={pets}
        appointments={appointments}
        questions={questions}
      />
    </div>
  );
}
