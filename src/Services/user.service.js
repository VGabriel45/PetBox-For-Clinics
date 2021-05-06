import axios from "axios";
import authHeader from "./auth-header";
import { useHistory } from "react-router-dom";

const API_URL = "http://localhost:8080";

const UserService = ({ customer }) => {
  const history = useHistory();

  const getPets = async () => {
    return await axios.get(`${API_URL}/customers/${customer.id}/pets`, {
      headers: authHeader(),
    });
  };

  const deleteCustomer = async () => {
    await axios.delete(
      `http://localhost:8080/customers/${customer.id}`,
      { headers: authHeader() },
      {
        data: { customer },
      }
    );
    history.push("/customers");
  };

  return { getPets, deleteCustomer };
};

export default UserService;
