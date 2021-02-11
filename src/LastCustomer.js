import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import axios from "axios";
import authHeader from "./Services/auth-header";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function LastCustomer() {
  const classes = useStyles();
  const [lastcustomer, setlastcustomer] = useState();

  async function getCustomer() {
    await axios
      .get("http://localhost:8080/customers/lastCustomer", {
        headers: authHeader(),
      })
      .then((res) => {
        setlastcustomer(res.data);
      });
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
      <Title>Last Added Customer</Title>
      {lastcustomer ? (
        <div>
          <Typography component="p" variant="h4">
            {lastcustomer.firstName} {lastcustomer.lastName}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on {formatDateWithoutTime(lastcustomer.lastSeen)}
          </Typography>
          <div>
            <Link href={`/customers/${lastcustomer.id}`}>View details</Link>
          </div>
        </div>
      ) : (
        "Nothing to show"
      )}
    </React.Fragment>
  );
}
