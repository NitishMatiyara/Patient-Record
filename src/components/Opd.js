import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

const Opd = () => {
  return (
    <div className="container-fluid p-0 mt-3 mb-3">
      <div id="Findings" className="card shadow mb-5">
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
                        name="a_casenumber"
                        placeholder="Enter Case Number"
                        defaultValue=""
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
                        name="a_chief_complaint"
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
                        name="a_historyillness"
                        defaultValue=""
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
                          name="a_bp"
                          defaultValue=""
                          placeholder="BP"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Respiratory Rate</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="a_rr"
                          defaultValue=""
                          placeholder="RR"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Capillary Refill</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="a_cr"
                          defaultValue=""
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
                          name="a_temp"
                          defaultValue=""
                          placeholder="TEMP"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Weight</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="a_wt"
                          defaultValue=""
                          placeholder="WT"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Pulse Rate</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          name="a_pr"
                          defaultValue=""
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
                        name="a_date"
                        placeholder="Enter Case Number"
                        defaultValue=""
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
                        name="a_physicalexam"
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
                        name="a_diagnosis"
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
                        name="a_medical_treatment"
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
                    name="submit"
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
      </div>
    </div>
  );
};

export default Opd;
