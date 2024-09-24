import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllDiagnosis } from "../../services/api/patientDiagnostic";
import { deleteRecord } from "../../helpers/action";

const DiagnosticTable = () => {
const [diagnosisData, setDiagnosisData] = useState([]);
const { id: patientId } = useParams();

useEffect(() => {
  const fetchDiagnosisData = async () => {
    const data = await getAllDiagnosis(patientId);
    setDiagnosisData(data.data || []); // Ensure it's always an array
  };

  fetchDiagnosisData();
}, [patientId]); // Only run when patientId changes

  const deleteHandler = async (id) => {
    let collectionName = "diagnosis";

    await deleteRecord(id, collectionName);
    getDiagnosisData(patientId);
  };

  const columns = [
    {
      dataField: "date",
      text: "Date",
    },
    { dataField: "diagnosis", text: "Diagnosis" },
    { dataField: "treatment", text: "Treatment" },
    {
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <Link to={`/patients/${row.id}`}>
            <i className="material-icons action" style={{ color: "#009E60" }}>
              &#xE417;
            </i>
          </Link>
          <Link to={`/patient/opdEdit/${patientId}/${row._id}`}>
            <i
              className="material-icons px-2 action"
              style={{ color: "#4682B4" }}
            >
              &#xE254;
            </i>
          </Link>
          <span
            style={{ color: "#d11a2a", border: "none", cursor: "pointer" }}
            onClick={() => deleteHandler(row._id)}
          >
            <i className="material-icons action">&#xE872;</i>
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="card mx-2 mt-3">
      <div className="card-header text-center">
        <span className="fs-5 font-weight-bold">OPD</span>
        <Link
          to={`/patient/diagnosisData/${patientId}`}
          className="btn btn-outline-success"
          style={{ float: "right" }}
        >
          Add
        </Link>
      </div>
      <div className="container text-center">
        <BootstrapTable keyField="id" data={diagnosisData} columns={columns} />
      </div>
    </div>
  );
};

export default DiagnosticTable;
