import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import UserLogin from "./pages/Login/UserLogin";
import UserRegistration from "./pages/Register/UserRegistration";
import UserAuthenticate from "./pages/UserVerification/UserAuthenticate";
import Error404 from "./pages/Error/Error404";
import Dashboard from "./pages/Dashboard/Dashboard";
import RecordsTable from "./pages/PatientDetails/RecordsTable";
import AddPatient from "./pages/PatientDetails/AddPatient";
import EditPatient from "./pages/PatientDetails/EditPatient";
import AddDiagnostic from "./pages/PatientDiagnostics/AddDiagnostic";
import EditDiagnostic from "./pages/PatientDiagnostics/EditDiagnostic";
import ViewPatient from "./pages/PatientDetails/ViewPatient";
import AddPayment from "./pages/PatientPayment/AddPayment";
import EditPayment from "./pages/PatientPayment/EditPayment";
import PaymentTable from "./pages/PatientPayment/PaymentTable";
import EmailVerify from "./pages/UserVerification/EmailVerify";

const App = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth/login" element={<UserLogin />} />
          <Route path="/auth/register" element={<UserRegistration />} />
          <Route
            path="/auth/user/verify-email/:id/:token"
            element={<EmailVerify />}
          />
          <Route
            path="/auth/user/social-sign-in/:value"
            element={<UserAuthenticate />}
          />
        </Route>
        <Route path={"*"} element={<Error404 />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/patient/records" element={<RecordsTable />} />
          <Route path="/patient/add" element={<AddPatient />} />
          <Route exact path="/patient/edit/:id" element={<EditPatient />} />
          <Route exact path="/patient/opd/:id" element={<AddDiagnostic />} />
          <Route
            exact
            path="/patient/opdEdit/:id/:id"
            element={<EditDiagnostic />}
          />
          <Route path="/patient/details/:id" element={<ViewPatient />} />
          <Route exact path="/payment/add/:id" element={<AddPayment />} />
          <Route exact path="/payment/edit/:id/:id" element={<EditPayment />} />
          <Route exact path="/payment/details/:id" element={<PaymentTable />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
