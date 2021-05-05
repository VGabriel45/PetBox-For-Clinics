import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import NavigationBar from "../Navbar/NavigationBar";

export default function WelcomePage() {
  const [clinics, setclinics] = useState([]);

  useEffect(() => {
    axios.get("/clinics").then((res) => setclinics(res.data));
  }, []);

  return (
    <React.Fragment>
      <NavigationBar />
      Welcome
      {clinics.map((c) => (
        <p>{c.clinicName}</p>
      ))}
    </React.Fragment>
  );
}
