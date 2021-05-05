import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PetsIcon from "@material-ui/icons/Pets";
import PeopleIcon from "@material-ui/icons/People";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AuthService from "./Services/auth.service";

import firebase from "./Firebase/firebase";

const currentUser = AuthService.getCurrentUser();

function logOut() {
  AuthService.logout();
}

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/dash">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <Link to="/pets">
        <ListItemText primary="Pets" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/customers">
        <ListItemText primary="Customers" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <Link to="/questions">
        <ListItemText primary="Questions" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIndIcon />
      </ListItemIcon>
      <Link to="/employees">
        <ListItemText primary="Employees" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SpellcheckIcon />
      </ListItemIcon>
      <Link to="/appointments">
        <ListItemText primary="Appointments" />
      </Link>
    </ListItem>
  </div>
);

const uploadImage = async (e) => {
  const file = await e.target.files[0];
  let storageRef = firebase.storage().ref();
  let fileRef = storageRef.child(currentUser.username);
  await fileRef.put(file);
};

export const secondaryListItems = (
  <div>
    {currentUser && currentUser.roles.includes("ROLE_ADMIN") ? (
      <div className="navbar-nav ml-auto">
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Link to="/login" onClick={logOut}>
            <ListItemText primary="Logout" />
          </Link>
        </ListItem>
        {/* <input type="file" onChange={uploadImage} /> */}
      </div>
    ) : (
      ""
    )}
  </div>
);
