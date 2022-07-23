import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes, Link } from "react-router-dom";
import Record from "../src/components/Record";
import Sidebar from "./components/Sidebar";
import Opd from "./components/Opd";
import AddPatient from "./components/addPatient";
import EditPatient from "./components/EditPatient";

const App = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={3}>
            <Sidebar />
          </Col>
          <Col>
            <Routes>
              <Route exact path="/patients/records" element={<Record />} />
              <Route exact path="/patients/add" element={<AddPatient />} />
              <Route
                exact
                path="/patients/edit/:id"
                element={<EditPatient />}
              />
              <Route exact path="/patients/opd" element={<Opd />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
