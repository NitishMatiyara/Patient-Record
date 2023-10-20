import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

function UserAuthenticate() {
  const [userInfo, setUserInfo] = useState({});
  const user = useRef(true);
  const { value } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.current && value === "success") {
      user.current = false;
      setUser();
    }
  }, []);
  const setUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/auth/loggedUser`,
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        setUserInfo(response?.data?.user);
        const userToken = Cookies.get("auth");
        const expirationTime = new Date(new Date().getTime() + 6000000);
        Cookies.set("userToken", userToken, { expires: expirationTime });
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "dark",
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  };
  return (
    <>
      <ToastContainer />
      {value === "success" ? (
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
                <div className="fs-3" style={{ color: "gray" }}>
                  Welcome,{" "}
                  <span style={{ color: "darkcyan" }}>{userInfo.name}</span>
                </div>
                <div className="btn btn-success mt-5" type="button">
                  <span
                    className="spinner-border spinner-border-sm mx-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
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
                  Unable to login.
                </div>
                <div className="btn btn-outline-secondary mt-5">
                  <a href="/auth/login" className="text-decoration-none">
                    {" "}
                    Kindly, login again...
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserAuthenticate;
