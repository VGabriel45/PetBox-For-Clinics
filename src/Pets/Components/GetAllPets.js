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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function GetAllPets() {
  const classes = useStyles();
  const [pets, setpets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function getPets() {
    await axios
      .get("http://localhost:8080/pets", { headers: authHeader() })
      .then((res) => setpets(res.data));
  }

  useEffect(() => {
    getPets();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results = pets.filter((pet) =>
      pet.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (event.target.value == "") {
      setSearchResults(pets);
    } else {
      setSearchResults(results);
    }
  };

  const displayPets = (pets) => {
    return (
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
            {pets
              ? pets.map((pet) => (
                  <StyledTableRow key={pet.id}>
                    <Link to={`/customers/${pet.customer.id}/pets/${pet.id}`}>
                      <StyledTableCell component="th" scope="row">
                        {pet.name}
                      </StyledTableCell>
                    </Link>
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
                ))
              : "Loading..."}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const content = (
    <div className="cards">
      {searchResults.length > 0
        ? displayPets(searchResults)
        : displayPets(pets)}
    </div>
  );

  const search = (
    <div>
      <Autocomplete
        style={{ width: "200px" }}
        id="searchPet"
        freeSolo
        options={pets.map((pet) => pet.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for pet"
            margin="normal"
            onChange={handleChange}
            onKeyPress={handleChange}
            value={searchTerm}
            type="text"
            name="search-pet"
            variant="outlined"
          />
        )}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <h1>Pets</h1>
        <Link to="/dash">Back to dashboard</Link>
        <div>
          <div>{search}</div>
          {content}
        </div>
      </Container>
    </React.Fragment>
  );
}
