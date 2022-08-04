import { useState, createContext } from "react";

export const Patient = createContext();
const PatientContext = ({ children }) => {
  const [patientDetail, setPatientDetail] = useState({});

  return (
    <Patient.Provider value={{ patientDetail, setPatientDetail }}>
      {children}
    </Patient.Provider>
  );
};

export default PatientContext;
