import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default function AppointmentPage(props) {
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;
  const appointmentId = params.appointmentId;
  const [appointment, setappointment] = useState({});

  async function getAppointment() {
    await axios
      .get(
        `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}`
      )
      .then((res) => setappointment(res.data));
  }

  function acceptAppointment() {
    // set accept boolean of appointment to true with a put request
    axios.get(
      `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}/accept`
    );
  }

  function declineAppointment() {
    // set accept boolean of appointment to false with a put request
    axios.get(
      `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}/decline`
    );
  }

  function deleteAppointment() {
    axios.delete(
      `http://localhost:8080/customers/${customerId}/appointments/${appointmentId}`
    );
  }

  useEffect(() => {
    getAppointment();
  }, []);

  return (
    <div>
      Appointment author:{" "}
      <h1>
        {appointment.customer
          ? appointment.customer.firstName + " " + appointment.customer.lastName
          : ""}
      </h1>
      Reason of appointment: <h2>{appointment.reason}</h2>
      Date of appointment: <h3>{appointment.dateOfAppointment}</h3>
      <div>
        {appointment.accepted ? (
          <div>
            <h2>This appointment has been accepted.</h2>
            <Button
              variant="contained"
              color="secondary"
              onClick={declineAppointment}
              className="btn btn-primary btn-sm"
            >
              Change to declined
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
            <h2>This appointment has been declined.</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={acceptAppointment}
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
      {console.log(appointment.reason)}
    </div>
  );
}
