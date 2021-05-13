import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import authHeader from "../../Services/auth-header";
import AuthService from "../../Services/auth.service";
import CustomersTable from "../../Components/Customers/CustomersTable";
import NavigationBar from "../../Navbar/NavigationBar";

import "../../Styles/CustomersTablePage.css";

export default function CustomizedTables() {
  const [customers, setcustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  async function getCustomers() {
    await axios
      .get(`http://localhost:8080/clinic/${currentUser.id}/customers`, {
        headers: authHeader(),
      })
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
    return <CustomersTable />;
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
      <NavigationBar />
      <Container maxWidth="lg" style={{ backgroundColor: "white" }}>
        <h1 className="title">Customers</h1>
        <div>{search}</div>
        <Link to="/addCustomer">
          <button type="submit" className="btn btn-primary">
            Add new customer
          </button>
          <br />
          <br />
        </Link>
        {content}
      </Container>
    </React.Fragment>
  );
}
