import axios from "axios";
import firebase from "../Firebase/firebase";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URL}signin`, {
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
    return axios.post(
      `${API_URL}clinic/${this.getCurrentUser().id}/signupCustomer`,
      {
        username,
        email,
        address,
        phoneNumber,
        gender,
        firstName,
        lastName,
        lastSeen,
      }
    );
  }

  registerClinic(username, email, password) {
    return axios.post(`${API_URL}clinic/signup`, {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  async uploadImage(e, clinicName) {
    const file = await e.target.files[0];
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child(clinicName);
    await fileRef.put(file);
  }

}

export default new AuthService();
