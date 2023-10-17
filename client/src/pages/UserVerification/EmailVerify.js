import React from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${process.env.BACKEND_SERVER_URL}/api/auth/user/verify-email?userId=${param.id}&token=${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);
  return (
    <>
      {validUrl ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="border border-3 border-success"></div>
            <div className="card  bg-white shadow p-5">
              <div className="mb-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  fill="currentColor"
                  className="bi bi-check-circle text-success"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
              </div>
              <div className="text-center">
                <div className="fs-4" style={{ color: "gray" }}>
                  Email verified successfully.
                </div>
                <div
                  className="btn btn-success mt-5"
                  type="button"
                  onClick={() => <Navigate to={"/"} />}
                >
                  Login
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="border border-3 border-danger"></div>
            <div className="card  bg-white shadow p-5">
              <div className="mb-4 text-center">
                <svg
                  style={{ color: "#DC4C64" }}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 16 16"
                  width="75"
                  height="75"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  {" "}
                  <path
                    d="m10.25 5.75-4.5 4.5m0-4.5 4.5 4.5"
                    fill="red"
                  ></path>{" "}
                  <circle cx="8" cy="8" r="6.25"></circle>{" "}
                </svg>
              </div>
              <div className="text-center">
                <div className="fs-3" style={{ color: "gray" }}>
                  Invalid Link
                </div>

                <div className="btn btn-secondary mt-5" type="button">
                  Kindly, verify again.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailVerify;
