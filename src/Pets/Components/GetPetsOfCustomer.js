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
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Container } from "@material-ui/core";
import authHeader from "../../Services/auth-header";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function GetAllPets(props) {
  const classes = useStyles();
  const {
    match: { params },
  } = props;
  const customerId = params.customerId;
  const [pets, setpets] = useState([]);

  async function getPets() {
    await axios
      .get(`http://localhost:8080/customers/${customerId}/pets`, {
        headers: authHeader(),
      })
      .then((res) => setpets(res.data));
  }

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Container>
      {pets.length > 0 ? (
        <div>
          <h1>Pets</h1>{" "}
          <div>
            <Autocomplete
              style={{ width: "250px" }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              // options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Gender</StyledTableCell>
                  <StyledTableCell align="right">Race</StyledTableCell>
                  <StyledTableCell align="right">Age</StyledTableCell>
                  <StyledTableCell align="right">Color</StyledTableCell>
                  <StyledTableCell align="right">Owner</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map((pet) => (
                  <StyledTableRow key={pet.id}>
                    <StyledTableCell component="th" scope="row">
                      <Link to={`/customers/${customerId}/pets/${pet.id}`}>
                        {pet.name}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pet.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right">{pet.race}</StyledTableCell>
                    <StyledTableCell align="right">{pet.age}</StyledTableCell>
                    <StyledTableCell align="right">{pet.color}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Link to={`/customers/${pet.customer.id}`}>
                        {pet.customer.firstName} {pet.customer.lastName}
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <h1>No pets for this customer yet.</h1>
      )}
    </Container>
  );
}
