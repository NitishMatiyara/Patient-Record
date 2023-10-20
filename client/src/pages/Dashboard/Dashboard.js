import React from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import Footer from "../../layouts/Footer";
import { useQuery } from "react-query";
import { useEffect } from "react";
import axios from "axios";
import Logo from "../../layouts/Logo";
import { Spinner } from "react-awesome-spinners";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  let token = Cookies.get("userToken");
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token]);
  const fetchUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/auth/loggedUser`,
      { withCredentials: true }
    );

    return response?.data?.user;
  };

  const { data, error, isLoading } = useQuery("user", fetchUser);
  if (isLoading)
    return (
      <>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Spinner />
        </div>
      </>
    );
  if (error)
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <p className="fs-3">
            {" "}
            <span className="text-danger">{error.response.data.message}</span>
          </p>

          <Link to={"/auth/login"}>
            <span className="btn btn-primary">Login</span>
          </Link>
        </div>
      </div>
    );

  return (
    <>
      {data && (
        <div>
          <Navbar user={data} />
          <Sidebar />
          <div style={{ position: "absolute", zIndex: -1 }}>
            <Logo />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Dashboard;
