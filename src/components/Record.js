import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button, Modal, Input } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddPatient from "./addPatient";
import PatientData from "../services/patientRecords";

function Home() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    const data = await PatientData.getAllPatients();
    // console.log(data.docs);
    setPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await PatientData.deletePatient(id);
    getPatients();
  };

  return (
    <div className="container-fluid pl-0">
      <div className="crud mt-1 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 ">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Patient"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div className="col-sm-3 offset-sm-2 mt-2" style={{ color: "black" }}>
            <h3>
              <b>Patient Records</b>
            </h3>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 ">
            <Link to="/patients/add" className="btn btn-outline-success">
              Add New Patient
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive ">
            <table
              className="table table-sm table-bordered"
              style={{ color: "green" }}
            >
              <thead>
                <tr>
                  <th className="col-sm-2">Case No.</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Contact</th>
                  <th>Treatment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ color: "black" }}>
                {patients.map((doc, index) => {
                  return (
                    <tr key={doc.id}>
                      <td>{doc.casenum}</td>
                      <td>
                        {doc.firstname +
                          " " +
                          doc.middlename +
                          " " +
                          doc.lastname}
                      </td>
                      <td>{doc.age}</td>
                      <td>{doc.mobile}</td>
                      <td></td>
                      <td>
                        <Link to={`/patients/${doc.id}`}>
                          <i className="material-icons">&#xE417;</i>
                        </Link>
                        <Link to={`/patients/edit/${doc.id}`}>
                          <i className="material-icons">&#xE254;</i>
                        </Link>
                        <button
                          style={{ color: "red", border: "none" }}
                          onClick={() => deleteHandler(doc.id)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
