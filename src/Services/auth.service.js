import axios from "axios";

const API_URL = "https://safe-mountain-15379.herokuapp.com/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post("https://safe-mountain-15379.herokuapp.com/api/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(
    username,
    email,
    address,
    phoneNumber,
    gender,
    firstName,
    lastName,
    lastSeen
  ) {
    return axios.post(`/clinic/${this.getCurrentUser().id}/signupCustomer`, {
      username,
      email,
      address,
      phoneNumber,
      gender,
      firstName,
      lastName,
      lastSeen,
    });
  }

  registerClinic(username, email, password) {
    return axios.post("/api/auth/clinic/signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
