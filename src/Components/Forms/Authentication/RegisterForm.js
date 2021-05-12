import React, { useState } from "react";
import FormValidationLogic from "./FormValidationLogic";
import authService from "../../../Services/auth.service";
import { Grid, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import NavigationBar from "../../../Navbar/NavigationBar";

import "../../../Styles/LoginPage.css";

const avatarStyle = {
  backgroundColor: "#6c93ea",
};

const RegisterForm = () => {
  const [clinicName, setclinicName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [agreed, setagreed] = useState(false);
  const [error, seterror] = useState("");
  const history = useHistory();

  const {
    checkForClinicName,
    checkForPassword,
    checkForEmail,
    clinicNameValid,
    passwordValid,
    emailValid,
  } = FormValidationLogic({
    clinicName: clinicName,
    password: password,
    email: email,
  });

  const register = (e) => {
    e.preventDefault();

    if (agreed === false) {
      seterror("Please accept terms and conditions to continue");
    } else {
      seterror("");
      clinicNameValid && passwordValid && emailValid
        ? authService
            .registerClinic(clinicName, email, password)
            .then(() => redirectUser())
            .catch((err) => seterror("Clinic name or email already used"))
        : console.log("");
    }
  };

  const redirectUser = () => {
    history.push(`/login`);
    window.location.reload("/login");
  };

  const closeNotification = () => {
    seterror("");
  };

  const agreeTerms = () => {
    let agree = agreed;
    setagreed(!agree);
  };

  const onChangeClinicName = async (e) => {
    const clinicName = await e.target.value;
    setclinicName(await clinicName);
    checkForClinicName();
  };

  const onChangePassword = async (e) => {
    const password = await e.target.value;
    setpassword(await password);
    checkForPassword();
  };

  const onChangeEmail = async (e) => {
    const email = await e.target.value;
    setemail(await email);
    checkForEmail();
  };

  return (
    <div className="loginPage">
      <NavigationBar />
      <br />
      <br />
      <br />
      <br />
      <div className="box mt-5" style={{ width: "40%", margin: "0 auto" }}>
        <Grid align="center" className="mt-2">
          <Avatar style={avatarStyle}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/pet-shop-14/500/pet_10-512.png"
              alt=""
            />
          </Avatar>
        </Grid>
        <br />
        <div style={{ textAlign: "center" }}>
          <p className="title">Register as Clinic</p>
        </div>
        <form onSubmit={register}>
          <br />
          <div class="field">
            <label class="label">Clinic name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class={
                  clinicName.length > 0
                    ? clinicNameValid
                      ? "input is-primary"
                      : "input is-danger"
                    : "input"
                }
                type="text"
                placeholder="Type your clinic name"
                onChange={onChangeClinicName}
                value={clinicName}
                name="name"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              {clinicName.length > 0 ? (
                clinicNameValid === true ? (
                  <div>
                    <span class="icon is-small is-right">
                      <i class="fas fa-check"></i>
                    </span>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            {clinicName.length > 0 ? (
              clinicNameValid === true ? (
                <p class="help is-success">Valid clinic name</p>
              ) : (
                <p class="help is-danger">
                  Username must be between 3 and 25 characters
                </p>
              )
            ) : (
              ""
            )}
          </div>
          <br />
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class={
                  password.length
                    ? passwordValid
                      ? "input is-primary"
                      : "input is-danger"
                    : "input"
                }
                type="password"
                placeholder="Type your password"
                onChange={onChangePassword}
                value={password}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
              {passwordValid === true ? (
                <div>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            {password.length > 0 ? (
              passwordValid ? (
                <p class="help is-success">Valid password</p>
              ) : (
                <p class="help is-danger">
                  Password must contain letters and numbers only.
                </p>
              )
            ) : (
              ""
            )}
          </div>
          <br />
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class={
                  email.length > 0
                    ? emailValid
                      ? "input is-primary"
                      : "input is-danger"
                    : "input"
                }
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
                <div>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            {email.length > 0 ? (
              emailValid === true ? (
                <p class="help is-success">Valid clinic email</p>
              ) : (
                <p class="help is-danger">Must be a valid email</p>
              )
            ) : (
              ""
            )}
          </div>
          <br />
          <div>
            <p>
              {error ? (
                <div class="notification is-danger is-light">
                  <button class="delete" onClick={closeNotification}></button>
                  {error}
                </div>
              ) : (
                ""
              )}
            </p>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" onChange={agreeTerms} />I agree to the{" "}
                <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>
          <br />
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control" style={{ width: "100%" }}>
              <button
                class="button is-link is-light"
                style={{ marginLeft: "70%" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
