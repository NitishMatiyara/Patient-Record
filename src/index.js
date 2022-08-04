import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import PatientContext from "./context/PatientContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <PatientContext>
        <App />
      </PatientContext>
    </BrowserRouter>
  </StrictMode>
);
