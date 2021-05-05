import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { AppBar } from "@material-ui/core";

export default function SuccesPage() {
  return (
    <div className="successPageBody">
      <AppBar />
      <div className="card">
        <div
          style={{
            "border-radius": "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark" className="successI">
            ✓
          </i>
        </div>
        <h1 className="successH1">Success</h1>
        <p className="successP">
          Your response has been sent !
          <br />
          <Link to={`/dash`}>
            <Button variant="contained" style={{ marginTop: "5%" }}>
              Back to dashboard
            </Button>{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
