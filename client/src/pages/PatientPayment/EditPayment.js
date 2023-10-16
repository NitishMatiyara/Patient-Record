import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import PaymentData from "../../services/api/patientPayment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { updateRecord } from "../../helpers/action.js";
import { getPayment } from "../../services/api/patientPayment";

const EditPayment = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [paymentDetail, setPaymentDetail] = useState({});
  const [message, setMessage] = useState({ error: false, msg: "" });

  const { date, description, amount } = paymentDetail;

  useEffect(() => {
    editHandler(id);
  }, []);

  let name, value;
  const updatePayment = (e) => {
    name = e.target.name;
    value = e.target.value;

    setPaymentDetail({ ...paymentDetail, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPayment = { date, description, amount };
    await updateRecord(id, newPayment, "payment", setMessage);
  };

  useEffect(() => {
    editHandler(id);
  }, []);
  const editHandler = async (id) => {
    const response = await getPayment(id);
    setPaymentDetail(response.data);
  };

  return (
    <>
      <div className="p-1 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
            className="position-absolute top-10 start-50 translate-middle-x w-50"
            style={{ zIndex: 1 }}
          >
            {message?.msg}
          </Alert>
        )}{" "}
      </div>
      <div
        className="container-fluid mt-5"
        style={{ width: "94%", marginLeft: "2.5rem" }}
      >
        <div className="card shadow mx-4">
          <div className="card-header py-3">
            <h5 className="mb-2 text-gray-800">Edit Payment</h5>
          </div>
          <div className="container my-5">
            <form onSubmit={submitHandler}>
              <div className="row mb-3 px-4">
                <label className="col-sm-2 col-form-label">Date</label>
                <div className="col-sm-4">
                  <input
                    required
                    type="date"
                    className="form-control"
                    name="date"
                    value={date}
                    onChange={updatePayment}
                  />
                </div>
              </div>
              <div className="row mb-3 px-4">
                <label className="col-sm-2 col-form-label">Amount</label>
                <div className="col-sm-4">
                  <input
                    required
                    type="number"
                    className="form-control"
                    name="amount"
                    value={amount}
                    onChange={updatePayment}
                  />
                </div>
              </div>
              <div className="row mb-3 px-4">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-6">
                  <input
                    required
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={updatePayment}
                  />
                </div>
              </div>
              <button className="btn btn-success ml-4" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPayment;
