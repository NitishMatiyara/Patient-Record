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
    <div className="container-fluid mt-2 p-0">
      <div className="shadow p-3 mb-3 bg-white rounded ">
        <div className="row card-header ">
          <div className="col">
            <h5 className="mb-2 text-gray-800">Patient Records</h5>
          </div>
          <div className="col">
            <Link to="/patients/add" className="btn btn-outline-success">
              Add New Patient
            </Link>
          </div>
        </div>
        <div className="col">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search Patient"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="row">
          <div className="table-responsive p-0">
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
                          <i
                            className="material-icons"
                            style={{ color: "blueviolet" }}
                          >
                            &#xE417;
                          </i>
                        </Link>
                        <Link to={`/patients/edit/${doc.id}`}>
                          <i
                            className="material-icons"
                            style={{ color: "black" }}
                          >
                            &#xE254;
                          </i>
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
