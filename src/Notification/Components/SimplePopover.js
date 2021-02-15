import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import authHeader from "../../Services/auth-header";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [questions, setquestions] = useState([]);
  const [appointments, setappointments] = useState([]);
  const [numberOfUnseenQuestions, setNumberOfUnseenQuestions] = useState();
  const [
    numberOfUnseenAppointments,
    setNumberOfUnseenAppointments,
  ] = useState();
  const [seen, setseen] = useState();
  var data;

  async function getData() {
    await axios
      .get("http://localhost:8080/questions", { headers: authHeader() })
      .then((res) => setquestions(!res.data.seen ? res.data : ""));
    await axios
      .get("http://localhost:8080/appointments", { headers: authHeader() })
      .then((res) => setappointments(!res.data.seen ? res.data : ""));
  }

  useEffect(() => {
    getData();
    getNumberOfUnseenQuestions();
    getNumberOfUnseenAppointments();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function markAsSeen() {
    questions.length > 0
      ? questions.forEach((q) => {
          axios.get(
            `http://localhost:8080/customers/${q.customer.id}/questions/${q.id}/setSeen`,
            { headers: authHeader() }
          );
          setNumberOfUnseenQuestions(0);
        })
      : console.log("No question");

    appointments.length > 0
      ? appointments.forEach((a) => {
          axios.get(
            `http://localhost:8080/customers/${a.customer.id}/appointments/${a.id}/setSeen`,
            { headers: authHeader() }
          );
        })
      : console.log("No appointment");
  }

  async function getNumberOfUnseenQuestions() {
    return await axios
      .get("http://localhost:8080/questions/seen", { headers: authHeader() })
      .then((res) => setNumberOfUnseenQuestions(res.data));
  }

  async function getNumberOfUnseenAppointments() {
    return await axios
      .get("http://localhost:8080/appointments/seen", { headers: authHeader() })
      .then((res) => setNumberOfUnseenAppointments(res.data));
  }

  return (
    <div>
      <Badge
        badgeContent={numberOfUnseenQuestions + numberOfUnseenAppointments}
        color="secondary"
        onClick={markAsSeen}
      >
        {" "}
        <Button
          aria-describedby={id}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <NotificationsIcon />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography className={classes.typography}>
            {console.log(questions)}
            {questions.length > 0
              ? questions.map((q) =>
                  !q.seen ? (
                    <div>
                      <p>
                        <Link
                          to={`/customers/${q.customer.id}/questions/${q.id}`}
                        >
                          <strong>{`Question - ${q.text}`}</strong>
                        </Link>
                      </p>
                      <small>{`by ${q.author}`}</small>
                      <br />
                    </div>
                  ) : (
                    ""
                  )
                )
              : "No new questions"}
            <hr />
            {appointments.length > 0
              ? appointments.map((a) =>
                  !a.seen ? (
                    <div>
                      <p>
                        <strong>
                          <Link
                            to={`/customers/${a.customer.id}/appointments/${a.id}`}
                          >{`Appointment - ${a.reason}`}</Link>
                        </strong>
                      </p>
                      <small>{`by ${a.customer.firstName} ${a.customer.lastName}`}</small>
                      <br />
                    </div>
                  ) : (
                    ""
                  )
                )
              : "No new appointments"}
          </Typography>
        </Popover>
      </Badge>
    </div>
  );
}
