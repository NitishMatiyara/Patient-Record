import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button, Modal, Input } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddPatient from "./addPatient";
import PatientData from "../services/patientRecords";
import "../style.css";
import PatientDetail from "./PatientDetail";

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
    <>
      <div className="container mt-2 p-0">
        <div className=" card shadow mb-3 bg-white rounded ">
          <div className=" card-header">
            <h5 className="text-gray-800">Patient Records</h5>

            <Link
              to="/patients/add"
              className="btn btn-outline-success"
              style={{ float: "right" }}
            >
              Add New Patient
            </Link>
          </div>
          <div className="row">
            <div className="col text-gray">
              <label style={{ paddingLeft: "1rem" }}>
                Show
                <select
                  className="form-select form-select-sm"
                  style={{ width: "10rem", marginRight: ".2rem" }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </label>
              entries
            </div>
            <div className="col">
              <form
                className="form-inline"
                style={{ marginTop: "1.2rem", width: "max-content" }}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Patient"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div className="table-responsive p-0 my-3">
            <table
              className="table table-sm table-bordered text-gray"
              style={{ width: "95%", marginLeft: "1rem" }}
            >
              <thead>
                <tr>
                  <th className="col-sm-0.5 text-center">Case No.</th>
                  <th className="col-3 text-center">Name</th>
                  <th className="col-sm-0.5 text-center">Age</th>
                  <th className="col-sm-1 text-center">Contact</th>
                  <th className="col-3 text-center">Treatment</th>
                  <th className="col-sm-2 text-center">Payment</th>
                  <th className="col-sm-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray text-center">
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
                      <td>{doc.treatment}</td>
                      <td>{doc.payment}</td>
                      <td>
                        <Link to={`/patients/details/${doc.id}`}>
                          <i
                            className="material-icons "
                            style={{ color: "#009E60" }}
                          >
                            &#xE417;
                          </i>
                        </Link>
                        <Link to={`/patients/edit/${doc.id}`}>
                          <i
                            className="material-icons"
                            style={{ color: "#4682B4" }}
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
    </>
  );
}

export default Home;
