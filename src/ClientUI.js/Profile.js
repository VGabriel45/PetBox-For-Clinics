import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import AuthService from "../Services/auth.service";
import axios from "axios";

export default function Profile(props) {
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());
  const [user, setuser] = useState({});

  async function getData() {
    const response = await axios.get(
      `http://localhost:8080/customers/${currentUser.id}`
    );
    setuser(response.data);
    const userResponse = axios.get(
      `http://localhost:8080/customers/${currentUser.id}`
    );
  }

  return <div>{currentUser.username}</div>;
}
