import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

export default function WelcomePage() {
const [clinics, setclinics] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/clinics").then((res) => setclinics(res.data));
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      Welcome
      {clinics.map((c) => <p>{c.clinicName}</p>)}
    </React.Fragment>
  );
}
