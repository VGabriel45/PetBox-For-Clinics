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
import Paper from "@material-ui/core/Paper";
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

const CustomersTable = () => {
  const classes = useStyles();
  const [customers, setcustomers] = useState([]);
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  async function getCustomers() {
    await axios
      .get(`http://localhost:8080/clinic/${currentUser.id}/customers`, {
        headers: authHeader(),
      })
      .then((res) => setcustomers(res.data));
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      {customers.length > 0 ? (
        <div style={{ margin: "0 auto" }}>
          <h1 className="title">Customers</h1>
          <br />
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
                    <StyledTableCell align="right">
                      {customer.age}
                    </StyledTableCell>
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
        </div>
      ) : (
        <h1
          className="title"
          style={{ margin: "0 auto", textAlign: "center", marginTop: "15%" }}
        >
          No customers yet
        </h1>
      )}
    </div>
  );
};

export default CustomersTable;
