import React, { useState, useEffect } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";
import PaymentData from "../services/payment";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    const data = await PaymentData.getAllPayments();
    // console.log(data.docs);
    setPayments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await PaymentData.deletePayment(id);
    getPayments();
  };

  const columns = [
    { id: 1, dataField: "date", text: "Date" },
    { id: 2, dataField: "description", text: "Description" },
    { id: 3, dataField: "amount", text: "Amount" },
    {
      id: 4,
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <Link to={`/patients/${row.id}`}>
            <i className="material-icons " style={{ color: "#009E60" }}>
              &#xE417;
            </i>
          </Link>
          {console.log(row)}
          <Link to={`/patients/paymentEdit/${id}/${row.id}`}>
            <i className="material-icons px-2" style={{ color: "#4682B4" }}>
              &#xE254;
            </i>
          </Link>
          <button
            style={{ color: "red", border: "none" }}
            onClick={() => deleteHandler(row.id)}
          >
            <i className="material-icons">&#xE872;</i>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="card shadow m-4">
      <div className="card-header py-1">
        <h5 className="mb-2 text-gray-800 text-center">Payment</h5>
        <Link
          to={`/patients/payment/${id}`}
          className="btn btn-outline-success"
          style={{ float: "right" }}
        >
          Add
        </Link>
      </div>
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable keyField="id" data={payments} columns={columns} />
      </div>
    </div>
  );
};

export default PaymentTable;
