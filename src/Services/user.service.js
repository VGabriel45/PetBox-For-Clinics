import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const UserService = ({ customerId }) => {
  const getPets = async () => {
    return await axios.get(`${API_URL}/customers/${customerId}/pets`, {
      headers: authHeader(),
    });
  };

  return { getPets };
};

export default UserService;
