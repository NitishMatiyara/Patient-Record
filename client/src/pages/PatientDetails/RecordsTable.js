import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getAllPatients,
  deletePatient,
} from "../../services/api/patientDetail";

function RecordsTable() {
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [query, setQuery] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    const data = await getAllPatients();
    setPatients(data.data);
  };

  const deleteHandler = async (patientId) => {
    let confirm_delete;
    confirm_delete = window.confirm("Are you sure to delete this patient ?");
    if (confirm_delete == true) {
      try {
        const response = await deletePatient(patientId);
        if (response.status == 201) {
          toast.success(response.data.message, { theme: "dark" });
          getPatients();
        } else if (response.status == 440) {
          toast.warning(response.data.message);
          setTimeout(() => {
            navigate("/home");
          }, 5000);
        } else {
          toast.error(
            response.data.error ? response.data.error : response.data.message
          );
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="container-fluid mt-1"
        style={{ maxWidth: "89%", marginLeft: "2.5rem" }}
      >
        <div
          className=" card shadow mb-3 bg-white rounded"
          style={{ height: "85vh" }}
        >
          <div className=" card-header text-center">
            <span className="fs-5 font-weight-bold">Patient Records</span>
            <Link
              to="/patient/add"
              className="btn btn-outline-success"
              style={{ float: "right" }}
            >
              Add New
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
                  className="form-control ml-3 mr-sm-2"
                  type="search"
                  placeholder="Search Patient"
                  aria-label="Search"
                  onChange={(e) =>
                    setQuery(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.toLowerCase().slice(1)
                    )
                  }
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
                  <th className="col-1 text-center">Case No.</th>
                  <th className="col-3 text-center">Name</th>
                  <th className="col-sm-0.5 text-center">Age</th>
                  <th className="col-2 text-center">Contact</th>
                  <th className="col-3 text-center">Treatment</th>
                  <th className="col-sm-2 text-center">Actions</th>
                </tr>
              </thead>
              {patients.length > 0 &&
                patients
                  .filter(
                    (doc) =>
                      doc.firstname.includes(query) ||
                      doc.case_no.toString() == query
                  )
                  .map((doc, index) => {
                    return (
                      <tbody className="text-gray text-center">
                        <tr key={doc._id}>
                          <td>{doc.case_no}</td>
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
                          <td>
                            <Link to={`/patient/details/${doc._id}`}>
                              <i
                                className="material-icons "
                                style={{ color: "#009E60" }}
                              >
                                &#xE417;
                              </i>
                            </Link>
                            <Link to={`/patient/edit/${doc._id}`}>
                              <i
                                className="material-icons"
                                style={{
                                  color: "#4682B4",
                                  margin: "0 5px 0 5px",
                                }}
                              >
                                &#xE254;
                              </i>
                            </Link>
                            <span
                              style={{
                                color: "#d11a2a",
                                border: "none",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteHandler(doc._id)}
                            >
                              <i className="material-icons">&#xE872;</i>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
            </table>
            {patients.length == 0 && (
              <div className="text-center">
                <span className="text-gray fs-5">No records found.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordsTable;
