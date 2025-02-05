import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllPayments } from "../../services/api/patientPayment";
import { deleteRecord } from "../../helpers/action";
import { ToastContainer } from "react-toastify";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const { id: patientId } = useParams();
const fetchPayments = async () => {
  const data = await getAllPayments(patientId);
  setPayments(data.data || []); // Ensure it's always an array
};

useEffect(() => {
  fetchPayments();
}, [patientId]); // Only run when patientId changes

const deleteHandler = async (id) => {
  let collectionName = "payments";

  await deleteRecord(id, collectionName);
  fetchPayments(); // Fetch updated data after deletion
};

  const columns = [
    { dataField: "date", text: "Date" },
    { dataField: "description", text: "Description" },
    { dataField: "amount", text: "Amount" },
    {
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <Link to={`/patient/${row._id}`}>
            <i className="material-icons action" style={{ color: "#009E60" }}>
              &#xE417;
            </i>
          </Link>
          <Link to={`/payment/edit/${patientId}/${row._id}`}>
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
    <>
      <ToastContainer />
      <div className="card mx-2 mb-3">
        <div className="card-header text-center">
          <span className="fs-5 font-weight-bold">Payment</span>
          <Link
            to={`/payment/add/${patientId}`}
            className="btn btn-outline-success"
            style={{ float: "right" }}
          >
            Add
          </Link>
        </div>
        <div className="container text-center">
          <BootstrapTable keyField="_id" data={payments} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default PaymentTable;
