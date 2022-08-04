import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentTable from "./PaymentTable";
import { Patient } from "../context/PatientContext";
import PatientData from "../services/patientRecords";
import OpdTable from "./OpdTable";

const PatientDetail = () => {
  const { patientDetail, setPatientDetail } = useContext(Patient);
  const { id } = useParams();
  const {
    casenum,
    firstname,
    lastname,
    middlename,
    age,
    city,
    birthdate,
    address,
    mobile,
    occupation,
    gender,
    civil,
  } = patientDetail;

  useEffect(() => {
    editHandler();
  }, []);

  const editHandler = async () => {
    try {
      const docSnap = await PatientData.getPatient(id);
      console.log("the record is :", docSnap.data());
      setPatientDetail(docSnap.data());
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card shadow m-2">
      <div className="card-header py-3">
        <div className="row">
          <div className="col-sm-8">
            {" "}
            <h5 className="mb-2 text-gray-800">
              {firstname + " " + middlename + " " + lastname}
            </h5>
          </div>
          <div className="col-sm">
            {" "}
            <h5 className="mb-2 text-gray-800">Case No :{" " + casenum}</h5>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-sm">Mobile :{" " + mobile}</div>
          <div className="col-sm">Age :{" " + age}</div>
        </div>
        <div className="row">
          <div className="col-sm">Birthdate :{" " + birthdate}</div>
          <div className="col-sm">Gender :{" " + gender}</div>
        </div>
        <div className="row">
          <div className="col-sm">Occupation :{" " + occupation}</div>
          <div className="col-sm">Civil Status :{" " + civil}</div>
        </div>
        <div className="row">
          <div className="col-sm">Address :{" " + address}</div>
          <div className="col-sm">City :{" " + city}</div>
        </div>
      </div>
      <OpdTable />
      <PaymentTable />
    </div>
  );
};

export default PatientDetail;
