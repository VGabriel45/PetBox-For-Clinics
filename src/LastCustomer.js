import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import axios from "axios";
import authHeader from "./Services/auth-header";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function LastCustomer({ clinicId }) {
  const classes = useStyles();
  const [lastcustomer, setlastcustomer] = useState();

  async function getCustomer() {
    await axios
      .get("http://localhost:8080/customers/lastCustomer" + "/" + clinicId, {
        headers: authHeader(),
      })
      .then((res) => {
        setlastcustomer(res.data);
      });
  }

  function createNotification(type, message) {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info(message);
          break;
        case "success":
          NotificationManager.success(message);
          break;
        case "warning":
          NotificationManager.warning(message, 3000);
          break;
        case "error":
          NotificationManager.error(message, 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  }

  function formatDateWithoutTime(date) {
    var parsedDate = new Date(date);
    return parsedDate.toLocaleString();
  }

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <React.Fragment>
      <NotificationContainer />
      <Title>Last Added Customer</Title>
      {lastcustomer ? (
        <div>
          <Typography component="p" variant="h4">
            {lastcustomer.username}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on {formatDateWithoutTime(lastcustomer.lastSeen)}
          </Typography>
          <br />
          <div>
            <Link
              onClick={createNotification(
                "info",
                `${lastcustomer.firstName} ${
                lastcustomer.lastName
                } was the last added customer in our database on ${formatDateWithoutTime(
                  lastcustomer.lastSeen
                )}`
              )}
            >
              Help
              <br />
            </Link>
            <br />
          </div>
          <a href={`/customers/${lastcustomer.id}`}>See profile</a>
        </div>
      ) : (
          "Nothing to show"
        )}
    </React.Fragment>
  );
}
