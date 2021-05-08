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
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import authHeader from "../../Services/auth-header";
import AuthService from "../../Services/auth.service";

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

export default function Employees() {
  const classes = useStyles();
  const [employees, setemployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  async function getEmployees() {
    await axios
      .get(`http://localhost:8080/clinic/${currentUser.id}/employees`, {
        headers: authHeader(),
      })
      .then((res) => setemployees(res.data));
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results = employees.filter((empl) =>
      empl.firstName.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (event.target.value == "") {
      setSearchResults(employees);
    } else {
      setSearchResults(results);
    }
  };

  const search = (
    <div>
      <Autocomplete
        style={{ width: "200px" }}
        id="searchEmployee"
        freeSolo
        options={employees.map((em) => em.firstName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search employee"
            margin="normal"
            onChange={handleChange}
            onKeyPress={handleChange}
            value={searchTerm}
            type="text"
            name="search-employee"
            variant="outlined"
          />
        )}
      />
    </div>
  );

  const displayEmployees = (employees) => {
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>FIrst Name</StyledTableCell>
                <StyledTableCell align="left">Last Name</StyledTableCell>
                <StyledTableCell align="left">Age</StyledTableCell>
                <StyledTableCell align="left">Role</StyledTableCell>
                <StyledTableCell align="left">Phone number</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((em) => (
                <StyledTableRow key={em.id}>
                  <StyledTableCell component="th" scope="row">
                    <Link to={`/employees/${em.id}`}>{em.firstName}</Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">{em.lastName}</StyledTableCell>
                  <StyledTableCell align="left">{em.age}</StyledTableCell>
                  <StyledTableCell align="left">{em.role}</StyledTableCell>
                  <StyledTableCell align="left">
                    {em.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">{em.address}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  };

  const content = (
    <div className="cards">
      {searchResults.length > 0
        ? displayEmployees(searchResults)
        : displayEmployees(employees)}
    </div>
  );

  return (
    <div>
      {employees.length > 0 ? (
        <Container maxWidth="lg" style={{ marginTop: "5%" }}>
          <h1>Employees</h1>
          <div>{search}</div>
          <Link to="/addEmployee">
            <button type="submit" className="btn btn-primary">
              Add employee
            </button>
            <br />
            <br />
          </Link>
          {content}
        </Container>
      ) : (
        <Container>
          <h2>No employees yet.</h2>
          <Link to="/addEmployee">
            <button type="submit" className="btn btn-primary">
              Add employee
            </button>
            <br />
          </Link>
        </Container>
      )}
    </div>
  );
}
