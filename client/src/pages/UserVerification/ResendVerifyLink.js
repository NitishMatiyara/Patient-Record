import React, { useState } from "react";
import "../Login/auth.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ResendVerifyLink = () => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/auth/user/resend-verify-link`,
        { email }
      );
      if (response.data.status === "success") {
        toast.success(response.data.message, { theme: "colored" });
      } else {
        setValid(false);
        toast.error(response.data.message, { theme: "colored" });
      }
    } catch (error) {
      toast.error(error.response, { theme: "colored" });
    }
  };
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="mt-5 offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
            <div className="panel border bg-white">
              <div className="panel-heading">
                <h3 className="pt-3 font-weight-bold">Verify Email</h3>
              </div>
              <div className="panel-body p-3">
                <form onSubmit={handleSubmit}>
                  <div className="form-group py-2">
                    <div className="input-field">
                      {" "}
                      <span className="far fa-user p-2"></span>{" "}
                      <input
                        type="text"
                        placeholder="Enter your Email"
                        name="email"
                        value={email}
                        required
                        onChange={handleChange}
                      />{" "}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-3"
                    >
                      Resend Verification Link
                    </button>
                    <ToastContainer />
                  </div>
                  {!valid && (
                    <Link to={"/"} className="btn btn-primary btn-block mt-5">
                      Register
                    </Link>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendVerifyLink;
