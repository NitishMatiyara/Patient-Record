import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UserRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const { status, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGUzNzg1MWNiZjMxNDkwMTA0ODQyNTciLCJpYXQiOjE2OTI3OTI5OTUsImV4cCI6MTY5MzIyNDk5NX0.T1yDJvEd6HcNH4WrsotC3ncmagtUjYxJo7EuJHBVWAU",
    };
    axios
      .get("http://localhost:8000/api/auth/loggeduser", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(1, res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((result) => {
      if (result.payload.status == "success") {
        toast.success(result.payload.message, { theme: "dark" });
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      } else {
        toast.error(result.payload.message, { theme: "dark" });
      }
    });
  };
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="mt-5 offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
            <div className="panel border bg-white">
              <div className="panel-heading">
                <h3 className="pt-3 font-weight-bold">Create Account</h3>
              </div>
              <div className="panel-body p-3">
                <form onSubmit={handleSubmit}>
                  <div className="form-group py-2">
                    <div className="input-field">
                      {" "}
                      <span className="far fa-user p-2"></span>{" "}
                      <input
                        type="text"
                        placeholder="Username"
                        name="name"
                        value={formData.name}
                        required
                        onChange={handleChange}
                      />{" "}
                    </div>
                  </div>
                  <div className="form-group py-2">
                    <div className="input-field">
                      {" "}
                      <span className="far fa-user p-2"></span>{" "}
                      <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        required
                        onChange={handleChange}
                      />{" "}
                    </div>
                  </div>
                  <div className="form-group py-1 pb-2">
                    <div className="input-field">
                      {" "}
                      <span className="fas fa-lock px-2"></span>{" "}
                      <input
                        type={showPassword ? "password" : "text"}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        required
                        onChange={handleChange}
                      />{" "}
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className={
                          showPassword ? "far fa-eye-slash" : "far fa-eye"
                        }
                        style={{ color: "gray" }}
                      ></span>{" "}
                    </div>
                  </div>
                  <div className="form-group py-1 pb-2">
                    <div className="input-field">
                      {" "}
                      <span className="fas fa-lock px-2"></span>{" "}
                      <input
                        type={showPassword ? "password" : "text"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        required
                        onChange={handleChange}
                      />{" "}
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className={
                          showPassword ? "far fa-eye-slash" : "far fa-eye"
                        }
                        style={{ color: "gray" }}
                      ></span>{" "}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-3"
                    >
                      {status == "loading"
                        ? "Registering..."
                        : "UserRegistation"}
                    </button>
                  </div>
                  <ToastContainer />
                  <div className="text-center pt-4 text-muted">
                    Already have an account?{" "}
                    <Link to="/auth/login">Sign In</Link>{" "}
                  </div>
                </form>
              </div>
              <div className="mx-3 my-2 py-2 bordert">
                <div className="text-center py-3">
                  {" "}
                  <a
                    href="https://wwww.facebook.com"
                    target="_blank"
                    className="px-2"
                  >
                    {" "}
                    <img
                      className="logo"
                      src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"
                      alt=""
                    />{" "}
                  </a>{" "}
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    className="px-2"
                  >
                    {" "}
                    <img
                      className="logo"
                      src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                      alt=""
                    />{" "}
                  </a>{" "}
                  <a
                    href="https://www.github.com"
                    target="_blank"
                    className="px-2"
                  >
                    {" "}
                    <img
                      className="logo"
                      src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png"
                      alt=""
                    />{" "}
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
