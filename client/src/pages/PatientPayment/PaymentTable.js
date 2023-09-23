import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllPayments } from "../../services/api/patientPayment";
import { deleteRecord } from "../../helpers/action";
import { ToastContainer } from "react-toastify";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getPayments(id);
  }, [payments]);

  const getPayments = async (id) => {
    const data = await getAllPayments(id);
    setPayments(data.data);
  };

  const deleteHandler = async (id) => {
    await deleteRecord(id, "payment");
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
            <i className="material-icons " style={{ color: "#009E60" }}>
              &#xE417;
            </i>
          </Link>
          <Link to={`/payment/edit/${id}/${row._id}`}>
            <i className="material-icons px-2" style={{ color: "#4682B4" }}>
              &#xE254;
            </i>
          </Link>
          <span
            style={{ color: "#d11a2a", border: "none", cursor: "pointer" }}
            onClick={() => deleteHandler(row._id)}
          >
            <i className="material-icons">&#xE872;</i>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="card mx-3 mb-3">
        <div className="card-header text-center">
          <span className="fs-5 font-weight-bold">Payment</span>
          <Link
            to={`/payment/add/${id}`}
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
