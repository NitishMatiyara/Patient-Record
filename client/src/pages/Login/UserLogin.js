import React, { useState } from "react";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { getGoogleUrl } from "../../services/auth/getGoogleUrl";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (result.payload.status === "success") {
        const userToken = result.payload.token;
        const expirationTime = new Date(new Date().getTime() + 6000000);
        Cookies.set("userToken", userToken, { expires: expirationTime });
        toast.success(result.payload.message, { theme: "colored" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(result.payload.message, { theme: "colored" });
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
                <h3 className="pt-3 font-weight-bold">Login</h3>
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
                        placeholder="Enter your Password"
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
                  <div className="form-inline">
                    {" "}
                    <input type="checkbox" name="remember" id="remember" />{" "}
                    <label htmlFor="remember" className="text-muted">
                      Remember me
                    </label>{" "}
                    <a href="#" id="forgot" className="font-weight-bold">
                      Forgot password?
                    </a>{" "}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-3"
                    >
                      {status === "loading" ? "Loading..." : "Login"}
                    </button>
                    <ToastContainer />
                  </div>
                  <div className="text-center pt-4 text-muted">
                    Don't have an account?{" "}
                    <Link to="/auth/register">Register</Link>{" "}
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
                  <span
                    onClick={() => window.location.replace(getGoogleUrl(from))}
                    target="_blank"
                    className="px-2"
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <img
                      className="logo"
                      src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                      alt=""
                    />{" "}
                  </span>{" "}
                  <a
                    href={"https://www.github.com"}
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

export default UserLogin;
