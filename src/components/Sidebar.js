import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

const Sidebar = () => {
  return (
    <>
      <div>
        {/* Vertical navbar  */}
        <div className="vertical-nav " id="sidebar">
          <div className="py-4 px-3 mb-4  bg-gradient-success">
            <div className="media d-flex align-items-center">
              <i className="fa fa-folder-open fa-lg mr-3 text-light"></i>
              <div className="media-body">
                <h3 className="m-0" style={{ color: "white" }}>
                  Patient Records
                </h3>
              </div>
            </div>
          </div>

          <p className="text-light font-weight-bold text-uppercase px-3 small pb-4 mb-0">
            Dashboard
          </p>

          <ul className="nav flex-column mb-0 ">
            <li className="nav-item text-light">
              <Link to="/patients/records" className="nav-link text-light">
                <i className="fa fa-table mr-3 text-primary fa-fw"></i>
                Patient Records Table
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/patients/add" className="nav-link text-light">
                <i className="fa fa-address-card mr-3 text-primary fa-fw"></i>
                Add Patient
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/patients/opd" className="nav-link text-light">
                <i className="fa fa-inr mr-3 text-primary fa-fw"></i>
                Payments
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/patients/paymentTable" className="nav-link text-light">
                <i className="fa fa-user-plus mr-3 text-primary fa-fw"></i>
                Appointments
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
