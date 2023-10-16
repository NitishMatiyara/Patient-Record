import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { addPayment } from "../../services/api/patientPayment";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

const AddPayment = () => {
  let navigate = useNavigate();
  const { id: patientId } = useParams();
  const [paymentDetail, setPaymentDetail] = useState({
    date: "",
    description: "",
    amount: "",
  });
  const [message, setMessage] = useState({ error: false, msg: "" });

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
      const response = await addPayment(patientId, newPayment);
      if (response.status == 201) {
        setMessage({ error: false, msg: response.data.message });

        setPaymentDetail({
          date: "",
          description: "",
          amount: "",
        });
      } else if (response.status == 440) {
        setMessage({ error: true, msg: response.data.message });
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      } else {
        setMessage({
          error: true,
          msg: response.data.error
            ? response.data.error
            : response.data.message,
        });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
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
            <h5 className="mb-2 text-gray-800">Add Payment</h5>
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
                    onChange={getPayment}
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
                    onChange={getPayment}
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
                    onChange={getPayment}
                  />
                </div>
              </div>

              <button className="btn btn-success ml-4" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPayment;
