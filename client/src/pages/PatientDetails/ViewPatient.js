import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentTable from "../PatientPayment/PaymentTable";
import { getPatient } from "../../services/api/patientDetail";
import DiagnosticTable from "../PatientDiagnostics/DiagnosticTable";

const ViewPatient = () => {
  const [patient, setPatient] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    editHandler(id);
  }, []);
  const editHandler = async (id) => {
    const response = await getPatient(id);
    setPatient(response.data);
  };

  return (
    <div
      className="container-fluid mt-1"
      style={{ width: "89%", marginLeft: "2.5rem" }}
    >
      <div className="card shadow m-2 ">
        {patient.map((element) => {
          return (
            <div className="card-header py-3" key={element._id}>
              <div className="row">
                <div className="col-sm-8">
                  {" "}
                  <h5 className="mb-2 text-gray-800">
                    {element.firstname +
                      " " +
                      element.middlename +
                      " " +
                      element.lastname}
                  </h5>
                </div>
                <div className="col-sm">
                  {" "}
                  <h5 className="mb-2 text-gray-800">
                    Case No :{" " + element.case_no}
                  </h5>
                </div>
              </div>
              <hr></hr>
              <div className="row">
                <div className="col-sm">Mobile :{" " + element.mobile}</div>
                <div className="col-sm">Age :{" " + element.age}</div>
              </div>
              <div className="row">
                <div className="col-sm">
                  Birthdate :{" " + element.birthdate}
                </div>
                <div className="col-sm">Gender :{" " + element.gender}</div>
              </div>
              <div className="row">
                <div className="col-sm">
                  Occupation :{" " + element.occupation}
                </div>
                <div className="col-sm">
                  Civil Status :{" " + element.civilstatus}
                </div>
              </div>
              <div className="row">
                <div className="col-sm">Address :{" " + element.address}</div>
                <div className="col-sm">City :{" " + element.city}</div>
              </div>
            </div>
          );
        })}
        <DiagnosticTable />
        <PaymentTable />
      </div>
    </div>
  );
};

export default ViewPatient;
