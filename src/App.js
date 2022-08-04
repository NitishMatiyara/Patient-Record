import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes, Link } from "react-router-dom";
import Record from "../src/components/Record";
import Sidebar from "./components/Sidebar";
import Opd from "./components/OpdAdd";
import AddPatient from "./components/addPatient";
import EditPatient from "./components/EditPatient";
import Payment from "./components/Payment";
import PaymentTable from "./components/PaymentTable";
import PatientDetail from "./components/PatientDetail";
import PaymentEdit from "./components/PaymentEdit";
import OpdAdd from "./components/OpdAdd";

const App = () => {
  return (
    <>
      <nav
        className="navbar navbar-light bg-white shadow"
        style={{ height: "3rem" }}
      ></nav>
      <Container fluid>
        <Row>
          <Col xs={3}>
            <Sidebar />
          </Col>
          <Col style={{ paddingLeft: "0" }}>
            <Routes>
              <Route exact path="/patients/records" element={<Record />} />
              <Route exact path="/patients/add" element={<AddPatient />} />
              <Route
                exact
                path="/patients/edit/:id"
                element={<EditPatient />}
              />
              <Route exact path="/patients/opd/:id" element={<OpdAdd />} />
              <Route
                exact
                path="/patients/details/:id"
                element={<PatientDetail />}
              />
              <Route exact path="/patients/payment/:id" element={<Payment />} />
              <Route
                exact
                path="/patients/paymentEdit/:id/:id"
                element={<PaymentEdit />}
              />
              <Route
                exact
                path="/patients/paymentTable/:id"
                element={<PaymentTable />}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
      <footer
        className="sticky-footer bg-white"
        style={{
          height: "1.5rem",
          bottom: "0",
          position: "fixed",
          left: "224px",

          width: "50rem",
        }}
      >
        <div className="copyright text-center text-secondary my-auto">
          Created by <span style={{ color: "green" }}>Nitish</span> | &copy;
          2022 All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default App;
