import "./App.css";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dash" component={Dashboard} />
          <Route path="/" exact component={Dashboard} />

          <Route path="/customers" exact component={GetAllPersons} />
          <Route
            path="/customers/:customerId"
            exact
            component={CustomerProfile}
          />
          <Route path="/addCustomer" exact component={AddCustomer} />
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
          <Route path="/addEmployee" exact component={AddEmployee} />

          <Route path="/appointments" component={Appointments} />

          <Route path="/successPage" component={SuccesPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
