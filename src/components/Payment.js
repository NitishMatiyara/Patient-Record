import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PaymentData from "../services/payment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Payment = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [paymentDetail, setPaymentDetail] = useState({
    date: "",
    description: "",
    amount: "",
  });

  const { date, description, amount } = paymentDetail;

  let name, value;
  const getPayment = (e) => {
    name = e.target.name;
    value = e.target.value;

    setPaymentDetail({ ...paymentDetail, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPayment = { date, description, amount };
    try {
      await PaymentData.addPayments(newPayment);
      navigate(`/patients/details/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card shadow m-4">
      <div className="card-header py-3">
        <h5 className="mb-2 text-gray-800">Payment</h5>
      </div>
      <div className="container my-5">
        <form onSubmit={submitHandler}>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Date</label>
            <div className="col-sm-4">
              <input
                required
                type="date"
                className="form-control"
                name="date"
                value={date}
                onChange={getPayment}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-8">
              <input
                required
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={getPayment}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Amount</label>
            <div className="col-sm-4">
              <input
                required
                type="number"
                className="form-control"
                name="amount"
                value={amount}
                onChange={getPayment}
              />
            </div>
          </div>
          <button
            className="btn btn-success"
            style={{ marginLeft: "7rem" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
