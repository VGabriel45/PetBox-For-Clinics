import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import authHeader from "../Services/auth-header";
import { useHistory, Link } from "react-router-dom";
import AppointmentComponent from "./AppointmentComponent";
import firebase from "../Firebase/firebase";

import "../Styles/AppointmentPage.css";
import NavigationBar from "../Navbar/NavigationBar";

export default function AppointmentPage(props) {
  const {
    match: { params },
  } = props;
  const history = useHistory();
  const customerId = params.customerId;
  const appointmentId = params.appointmentId;
  const [appointment, setappointment] = useState({});
  const [customerImage, setcustomerImage] = useState("");

  async function getAppointment() {
    await axios
      .get(
        `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}`,
        { headers: authHeader() }
      )
      .then((res) => setappointment(res.data));
  }

  function acceptAppointment() {
    // set accept boolean of appointment to true with a put request
    axios.get(
      `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}/accept`,
      { headers: authHeader() }
    );
    window.location.reload();
  }

  function declineAppointment() {
    // set accept boolean of appointment to false with a put request
    axios.get(
      `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}/decline`,
      { headers: authHeader() }
    );
    window.location.reload();
  }

  function deleteAppointment() {
    axios.delete(
      `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}`,
      { headers: authHeader() }
    );
    history.push("/appointments");
    window.location.reload("/appointments");
  }

  function markAsSeen() {
    axios.get(
      `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}/setSeen`,
      { headers: authHeader() }
    );
  }

  function formatDateWithoutTime(date) {
    var parsedDate = new Date(date);
    return parsedDate.toLocaleDateString();
  }

  async function getCustomerImage() {
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child(await customerId);
    setcustomerImage(await fileRef.getDownloadURL());
  }

  useEffect(() => {
    getAppointment();
    markAsSeen();
    getCustomerImage();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div
        className="box"
        style={{ width: "40%", margin: "0 auto", marginTop: "10%" }}
      >
        <br />
        <Link to="/appointments">Back to appointments</Link>
        <br />
        <br />
        <AppointmentComponent
          appointment={appointment}
          customerImage={
            customerImage
              ? customerImage
              : "https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png"
          }
          date={formatDateWithoutTime(appointment.dateOfAppointment)}
        />
        <br />
        <div>
          {appointment.accepted ? (
            <div>
              <div className="notification is-primary">
                <h2>This appointment has been accepted.</h2>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={declineAppointment}
                style={{ marginRight: "235px" }}
              >
                Change to declined
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteAppointment}
              >
                Delete appointment
              </Button>
            </div>
          ) : appointment.declined ? (
            ""
          ) : (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={acceptAppointment}
                style={{ marginRight: "10px" }}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={declineAppointment}
              >
                Decline
              </Button>
            </div>
          )}
          {appointment.declined ? (
            <div>
              <div className="notification is-danger">
                <h2>This appointment has been declined.</h2>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={acceptAppointment}
                style={{ marginRight: "230px" }}
              >
                Change to accepted
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteAppointment}
              >
                Delete appointment
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
