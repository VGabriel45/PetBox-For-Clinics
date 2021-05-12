import { useHistory } from "react-router-dom";

const LandingPageLogic = () => {
  const history = useHistory();

  const redirectToClinicPage = () => {
    history.push("/clinicPage");
  };

  const redirectToCustomerPage = () => {
    history.push("/customerPage");
  };

  return { redirectToClinicPage, redirectToCustomerPage };
};

export default LandingPageLogic;
