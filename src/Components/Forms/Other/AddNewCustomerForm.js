import React, { useState } from "react";
import authService from "../../../Services/auth.service";
import Navbar from "../../../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import NavigationBar from "../../../Navbar/NavigationBar";
import FormValidationLogic from "../Authentication/FormValidationLogic";
import AuthService from "../../../Services/auth.service";
import { red } from "@material-ui/core/colors";
import LinearBuffer from "./LinearBuffer";

const AddNewCustomerForm = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setaddress] = useState("");
  const [gender, setgender] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const history = useHistory();

  const [currentClinic, setcurrentClinic] = useState(
    AuthService.getCurrentUser()
  );

  const { checkForEmail, emailValid } = FormValidationLogic({
    clinicName: "",
    password: "",
    email: email,
  });

  const onChangeUsername = async (e) => {
    const username = await e.target.value;
    setusername(await username);
    checkForEmail();
  };

  const onChangeFirstName = async (e) => {
    const firstName = await e.target.value;
    setfirstName(await firstName);
  };

  const onChangeLastName = async (e) => {
    const lastName = await e.target.value;
    setlastName(await lastName);
  };

  const onChangeAddress = async (e) => {
    const address = await e.target.value;
    setaddress(await address);
  };

  const onChangeGender = async (e) => {
    const gender = await e.target.value;
    setgender(await gender);
  };

  const onChangePhoneNumber = async (e) => {
    const phoneNumber = await e.target.value;
    setphoneNumber(await phoneNumber);
  };

  const onChangeEmail = async (e) => {
    const email = await e.target.value;
    setemail(await email);
    checkForEmail();
  };

  const redirectUser = () => {
    setTimeout(() => {
      history.push(`/dash`);
      window.location.reload("/dash");
    }, 2000);
    setloading(false);
    console.log(loading);
  };

  const addCustomer = (e) => {
    e.preventDefault();
    setloading(true);
    if (emailValid === true) {
      authService
        .register(
          username + ` - ${currentClinic.username}`,
          email,
          address,
          phoneNumber,
          gender,
          firstName,
          lastName
        )
        .catch(() => {
          seterror("Something went wrong, please try again.");
        });
      setloading(false);

      //   setTimeout(() => {
      //     setloading(false);
      //   }, 2500);

      //   setTimeout(() => {
      //     seterror("");
      //   }, 4000);
    }
  };

  return (
    <React.Fragment>
      <NavigationBar />
      <div
        className="container is-max-desktop box mt-5"
        style={{ width: "50%" }}
      >
        <br />
        {loading ? (
          <div>
            <LinearBuffer />
            <br />
          </div>
        ) : (
          <div>
            <p>
              {error ? (
                <div class="notification is-danger is-light">{error}</div>
              ) : (
                ""
              )}
            </p>
            <br />
            <div style={{ textAlign: "center" }}>
              <p className="title">Add new customer</p>
            </div>
            <form onSubmit={addCustomer}>
              <br />
              <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Customer username"
                    onChange={onChangeUsername}
                    value={username}
                    name="username"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">First name</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Customer first name"
                    onChange={onChangeFirstName}
                    value={firstName}
                    name="firstName"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <br />
              <div class="field">
                <label class="label">Last name</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Customer last name"
                    onChange={onChangeLastName}
                    value={lastName}
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Phone number</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="phone"
                    placeholder="Customer phone number"
                    onChange={onChangePhoneNumber}
                    value={phoneNumber}
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-phone"></i>
                  </span>
                </div>
              </div>
              <br />
              <div class="field">
                <label class="label">Gender</label>
                <div class="control has-icons-left has-icons-right">
                  <div class="select">
                    <select onChange={onChangeGender} value={gender}>
                      <option value="male" defaultValue>
                        Male
                      </option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <br />
              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class={emailValid ? "input is-primary" : "input is-danger"}
                    type="email"
                    placeholder="Type your clinic email"
                    onChange={onChangeEmail}
                    value={email}
                    name="email"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>

                  {emailValid === true ? (
                    <span class="icon is-small is-right">
                      <i class="fas fa-check"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                {emailValid === true ? (
                  <p class="help is-success">Valid customer email</p>
                ) : (
                  <p class="help is-danger">Must be a valid email</p>
                )}
              </div>
              {/* <br /> */}
              <div class="field">
                <label class="label">Address</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="address"
                    placeholder="Type your clinic address"
                    onChange={onChangeAddress}
                    value={address}
                    name="address"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-home"></i>
                  </span>
                </div>
              </div>
              <br />

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link">Submit</button>
                </div>
                <div
                  class="control"
                  style={{ position: "absolute", right: "10px" }}
                >
                  <button class="button is-link is-light">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AddNewCustomerForm;
