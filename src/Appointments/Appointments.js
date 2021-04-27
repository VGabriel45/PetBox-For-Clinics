import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import authHeader from "../Services/auth-header";
import AuthService from "../Services/auth.service";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [appointments, setappointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  async function getAppointments() {
    await axios
      .get(`http://localhost:8080/clinic/${currentUser.id}/appointments`, { headers: authHeader() })
      .then((res) => setappointments(res.data));
  }

  function formatDateWithoutTime(date) {
    var parsedDate = new Date(date);
    return parsedDate.toLocaleDateString();
  }

  useEffect(() => {
    getAppointments();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results = appointments.filter((app) =>
      app.customer.firstName
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    if (event.target.value == "") {
      setSearchResults(appointments);
    } else {
      setSearchResults(results);
    }
  };

  const displayAppointments = (appointments) => {
    return (
      <TableContainer component={Paper}>
        <Link to="/dash">Back to dashboard</Link>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Hour</StyledTableCell>
              <StyledTableCell align="right">Reason</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((app) => (
              <StyledTableRow key={app.id}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`customers/${app.customer.id}`}>
                    {app.customer.firstName}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDateWithoutTime(app.dateOfAppointment)}
                </StyledTableCell>
                <StyledTableCell align="right">{app.hour}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link
                    to={`customers/${app.customer.id}/appointments/${app.id}`}
                  >
                    {app.reason}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {!app.accepted && !app.declined ? (
                    <p style={{ color: "orange" }}>Waiting</p>
                  ) : app.accepted ? (
                    <p style={{ color: "green" }}>Accepted</p>
                  ) : (
                        <p style={{ color: "red" }}>Declined</p>
                      )}
                </StyledTableCell>
                {console.log(app)}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const content = (
    <div className="cards">
      {searchResults.length > 0
        ? displayAppointments(searchResults)
        : displayAppointments(appointments)}
    </div>
  );

  const search = (
    <div>
      <Autocomplete
        style={{ width: "200px" }}
        id="searchAppointment"
        freeSolo
        options={appointments.map((app) => app.customer.firstName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search appointment"
            margin="normal"
            onChange={handleChange}
            onKeyPress={handleChange}
            value={searchTerm}
            type="text"
            name="search-appointment"
            variant="outlined"
          />
        )}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <h1>Appointments</h1>
        <div>{search}</div>
        {content}
      </Container>
    </React.Fragment>
  );
}
