import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div>
        {/* Vertical navbar  */}
        <div
          className="vertical-nav "
          id="sidebar"
          style={{
            width: isOpen ? "15rem" : "3rem",
            minWidth: isOpen ? "15rem" : "3rem",
            zIndex: 1,
          }}
        >
          <div>
            {" "}
            <i
              className="fa fa-solid fa-bars text-light"
              onClick={toggleSidebar}
              style={{
                position: "absolute",
                top: "1rem",
                left: isOpen ? "13rem" : "1rem",
              }}
            ></i>
          </div>
          <div className="py-4 px-3 my-4  bg-gradient-success">
            <div className="media d-flex align-items-center">
              <i
                className="fa fa-folder-open fa-lg mr-3 text-light"
                style={{ display: isOpen ? "block" : "none" }}
              ></i>

              <div className="media-body">
                <h3
                  className="m-0"
                  style={{ color: "white", display: isOpen ? "block" : "none" }}
                >
                  Patient Records
                </h3>
              </div>
            </div>
          </div>

          <p
            className="text-light font-weight-bold text-uppercase px-3 small pb-4 mb-0"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Dashboard
          </p>

          <ul
            className="nav flex-column mb-0 "
            style={{ marginTop: isOpen ? "0.5rem" : "8.5rem" }}
          >
            <li className="nav-item text-light">
              <Link to="/patient/records" className="nav-link text-light">
                <i className="fa fa-table mr-3 text-primary fa-fw"></i>
                {isOpen ? "Patient Records Table" : ""}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/patient/add" className="nav-link text-light">
                <i className="fa fa-address-card mr-3 text-primary fa-fw"></i>
                {isOpen ? "Add Patient" : ""}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-light">
                <i className="fa fa-inr mr-3 text-primary fa-fw"></i>
                {isOpen ? "Payments" : ""}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-light">
                <i className="fa fa-user-plus mr-3 text-primary fa-fw"></i>
                {isOpen ? "Appointments" : ""}
              </Link>
            </li>
          </ul>
        </div>
        {/* End vertical navbar */}
      </div>
    </>
  );
};

export default Sidebar;
