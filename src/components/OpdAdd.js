import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import OpdData from "../services/opdFindings";
import { useParams, useNavigate } from "react-router-dom";

const OpdAdd = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [opdDetail, setOpdDetail] = useState({
    casenumber: "",
    complaint: "",
    historyillness: "",
    bp: "",
    rr: "",
    cr: "",
    pr: "",
    wt: "",
    temp: "",
    date: "",
    physicalexam: "",
    diagnosis: "",
    treatment: "",
  });

  const {
    casenumber,
    complaint,
    historyillness,
    bp,
    rr,
    cr,
    pr,
    wt,
    temp,
    date,
    physicalexam,
    diagnosis,
    treatment,
  } = opdDetail;

  let name, value;
  const getOpd = (e) => {
    name = e.target.name;
    value = e.target.value;

    setOpdDetail({ ...opdDetail, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOpd = {
      casenumber,
      complaint,
      historyillness,
      bp,
      rr,
      cr,
      pr,
      wt,
      temp,
      date,
      physicalexam,
      diagnosis,
      treatment,
    };
    console.log(newOpd);

    try {
      await OpdData.addOpd(newOpd);
      navigate(`/patients/details/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container-fluid p-0 mt-3 mb-3">
      <form id="Findings" className="card shadow mb-5" onSubmit={handleSubmit}>
        <div className="card-header py-3">
          <h5 className="mb-2 text-gray"> Out Patient Findings</h5>
        </div>
        <div className="card-body p-0">
          <div className="container"></div>

          <div className="table">
            <div className="container-fluid p-3">
              <div className="row">
                <div className="col-sm-6">
                  <div>
                    <div className="row no-gutters">
                      <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                        Patient Case Number
                      </div>
                    </div>
                    <div className="h5 mb-1 font-weight-bold text-gray-800">
                      <input
                        className="form-control "
                        type="text"
                        name="casenumber"
                        placeholder="Enter Case Number"
                        onChange={getOpd}
                        value={casenumber}
                      />{" "}
                    </div>
                    <div className="text-danger text-center"></div>
                  </div>

                  <div>
                    <div className="row no-gutters">
                      <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                        Chief Complaint
                      </div>
                    </div>
                    <div className="h5 mb-1 font-weight-bold text-gray-800">
                      <textarea
                        className="form-control"
                        type="text"
                        name="complaint"
                        value={complaint}
                        placeholder="Enter Chief Complaint"
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <div className="row no-gutters">
                      <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                        History of Present Illness
                      </div>
                    </div>
                    <div className="h5 mb-1 font-weight-bold text-gray-800">
                      <input
                        className="form-control "
                        type="text"
                        name="historyillness"
                        onChange={getOpd}
                        value={historyillness}
                        placeholder="Enter History of Present Illness"
                      />
                    </div>
                    <div className="text-danger text-center"></div>
                  </div>

                  <div>
                    <div className="row no-gutters">
                      <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                        Vital Signs
                      </div>
                    </div>
                    <div className="row" style={{ color: "#6e707e" }}>
                      <div className="col-sm-4">
                        <label>Blood Pressure</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="bp"
                          onChange={getOpd}
                          value={bp}
                          placeholder="BP"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Respiratory Rate</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="rr"
                          onChange={getOpd}
                          value={rr}
                          placeholder="RR"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Capillary Refill</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="cr"
                          onChange={getOpd}
                          value={cr}
                          placeholder="CR"
                        />
                      </div>
                    </div>
                    <div className="row" style={{ color: "#6e707e" }}>
                      <div className="col-sm-4">
                        <label>Temperature</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="temp"
                          onChange={getOpd}
                          value={temp}
                          placeholder="TEMP"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Weight</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="wt"
                          onChange={getOpd}
                          value={wt}
                          placeholder="WT"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Pulse Rate</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="pr"
                          onChange={getOpd}
                          value={pr}
                          placeholder="PR"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div>
                    <div className="row no-gutters">
                      <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                        Date
                      </div>
                    </div>
                    <div className="h5 mb-1 font-weight-bold text-gray-800">
                      <input
                        className="form-control "
                        type="date"
                        name="date"
                        required
                        onChange={getOpd}
                        value={date}
                      />{" "}
                    </div>
                    <div className="text-danger text-center"></div>
                  </div>

                  <div>
                    <div className="row no-gutters">
                      <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                        Physical Examination
                      </div>
                    </div>
                    <div className="h5 mb-1 font-weight-bold text-gray-800">
                      <textarea
                        className="form-control"
                        type="text"
                        name="physicalexam"
                        onChange={getOpd}
                        value={physicalexam}
                        placeholder="Enter Physical Examination"
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <div className="row no-gutters">
                      <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                        Diagnosis
                      </div>
                    </div>
                    <div className="h5 mb-1 font-weight-bold text-gray-800">
                      <textarea
                        className="form-control  "
                        type="text"
                        name="diagnosis"
                        onChange={getOpd}
                        value={diagnosis}
                        placeholder="Enter Diagnosis"
                      ></textarea>
                    </div>
                    <div className="text-danger text-center"></div>
                  </div>

                  <div>
                    <div className="row no-gutters">
                      <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                        Medication/Treatment
                      </div>
                    </div>
                    <div className="h5 mb-1 font-weight-bold text-gray-800">
                      <textarea
                        className="form-control  "
                        type="text"
                        name="treatment"
                        onChange={getOpd}
                        value={treatment}
                        required
                        placeholder="Enter Medication/Treatment"
                      ></textarea>
                    </div>
                    <div className="text-danger text-center"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" container col-sm-6">
                  <button
                    type="submit"
                    className="btn btn-success btn-icon-split"
                    style={{ float: "right" }}
                  >
                    <i className="fa fa-arrow-right mr-2"></i>
                    Add Findings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OpdAdd;
