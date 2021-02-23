import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
  const [customers, setcustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function getCustomers() {
    await axios
      .get("https://petbox-backend.herokuapp.com/customers")
      .then((res) => setcustomers(res.data));
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results = customers.filter((customer) =>
      customer.firstName
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    if (event.target.value == "") {
      setSearchResults(customers);
    } else {
      setSearchResults(results);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const displayCustomers = (customers) => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>FirstName</StyledTableCell>
              <StyledTableCell align="right">LastName</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">PhoneNumber</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Pets</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <StyledTableRow key={customer.id}>
                <StyledTableCell component="th" scope="row">
                  <Link
                    to={`/customers/${customer.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {customer.firstName}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.lastName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.address}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {customer.gender}
                </StyledTableCell>
                <StyledTableCell align="right">{customer.age}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link
                    to={`/customers/${customer.id}/pets`}
                    style={{ textDecoration: "none" }}
                  >
                    See pets
                  </Link>
                </StyledTableCell>
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
        ? displayCustomers(searchResults)
        : displayCustomers(customers)}
    </div>
  );

  const search = (
    <div>
      <Autocomplete
        style={{ width: "200px" }}
        id="searchCustomer"
        freeSolo
        options={customers.map((customer) => customer.firstName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search customer"
            margin="normal"
            onChange={handleChange}
            onKeyPress={handleChange}
            value={searchTerm}
            type="text"
            name="search-customer"
            variant="outlined"
          />
        )}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <h1>Customers</h1>
        <div>{search}</div>
        <Link to="/addCustomer">
          <button type="submit" className="btn btn-primary">
            Add new customer
          </button>
        </Link>
        {content}
      </Container>
    </React.Fragment>
  );
}
