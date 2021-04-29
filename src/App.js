import "./App.css";

import React, { useState } from "react";
import GetAllPersons from "./Customers/Components/GetAllCustomers";
import GetAllPets from "./Pets/Components/GetAllPets";
import GetPetsOfCustomer from "./Pets/Components/GetPetsOfCustomer";
import Reports from "./Questions/Questions";
import Employees from "./Employess/Components/Employees";
import Appointments from "./Appointments/Appointments";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PersonProfile from "./Customers/Components/CustomerProfile";
import PetDetails from "./Pets/Components/PetDetails";
import AddPet from "./Pets/Components/AddPet";
import AppointmentPage from "./Appointments/AppointmentPage";
import AddEmployee from "./Employess/Components/AddEmployee";
import EmployeeProfile from "./Employess/Components/EmployeeProfile";
import AddCustomer from "./Customers/Components/AddCustomer";
import QuestionPage from "./Questions/QuestionPage";
import SuccesPage from "./SuccessPage/SuccesPage";
import CustomerProfile from "./Customers/Components/CustomerProfile";

import AuthService from "./Services/auth.service";
import WelcomePage from "./ClientUI.js/WelcomePage";
import RegisterCustomer from "./Auth/register.component";
import registerClinic from "./Auth/registerClinic";
import Login from "./Auth/login.component";
import Profile from "./ClientUI.js/Profile";
import UpdateCustomer from "./Customers/Components/UpdateCustomer";
import UpdateEmployee from "./Employess/Components/UpdateEmployee";
import UpdatePet from "./Pets/Components/UpdatePet";

export default function App() {
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dash" exact component={Dashboard} />

          <Route path="/customers" exact component={GetAllPersons} />
          <Route
            path="/customers/:customerId"
            exact
            component={CustomerProfile}
          />
          <Route path="/addCustomer" exact component={RegisterCustomer} />
          <Route
            path="/customers/:customerId/pets/:petId"
            exact
            component={PetDetails}
          />
          <Route
            path="/customers/:customerId/appointments/:appointmentId"
            exact
            component={AppointmentPage}
          />
          <Route
            path="/customers/:customerId/pets"
            exact
            component={GetPetsOfCustomer}
          />

          <Route
            path="/customers/:customerId/updateCustomer"
            exact
            component={UpdateCustomer}
          />

          <Route
            path="/customers/:customerId/addPet"
            exact
            component={AddPet}
          />
          <Route path="/pets" component={GetAllPets} />
          <Route
            path="/customers/:customerId/pets/:petId"
            exact
            component={PetDetails}
          />

          <Route
            path="/customers/:customerId/pets/:petId/updatePet"
            exact
            component={UpdatePet}
          />

          <Route path="/questions" exact component={Reports} />
          <Route
            path="/customers/:customerId/questions/:questionId"
            exact
            component={QuestionPage}
          />

          <Route path="/employees" component={Employees} exact />
          <Route
            path="/employees/:employeeId"
            component={EmployeeProfile}
            exact
          />

          <Route
            path="/employees/:employeeId/updateEmployee"
            exact
            component={UpdateEmployee}
          />

          <Route path="/addEmployee" exact component={AddEmployee} />

          <Route path="/appointments" component={Appointments} />

          <Route path="/successPage" component={SuccesPage} />

          <Route path="/home" component={WelcomePage} />

          <Route path="/" component={WelcomePage} exact />

          <Route path="/register" component={registerClinic} />

          <Route path="/login" component={Login} />

          <Route path="/myProfile/:id" exact component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}
