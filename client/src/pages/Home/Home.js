import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="banner">
      <ToastContainer />
      <div className="box flex">
        <div id="tabs">
          <Link to="/auth/login">
            <Button id="tabItem" className="mx-4" variant="success">
              Login
            </Button>{" "}
          </Link>
          <Link to="/auth/register">
            <Button variant="success">Register</Button>{" "}
          </Link>
        </div>
        <div
          style={{
            position: "absolute",
            top: "35vh",
            left: "50vw",
            color: "darkslategrey",
          }}
        >
          <h1 className="fw-bold m-0 display-1">MEDICAL</h1>
          <h1 className="fw-bold display-2">RECORDS</h1>
          <span className="fs-4">Keep track of your patients...</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
