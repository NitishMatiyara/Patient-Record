import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { addDiagnosis } from "../../services/api/patientDiagnostic";

const AddDiagnostic = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [opdDetail, setOpdDetail] = useState({
    complaint: "",
    illnessHistory: "",
    bloodPressure: "",
    pulseRate: "",
    weight: "",
    temperature: "",
    date: "",
    physicalExamination: "",
    diagnosis: "",
    treatment: "",
  });
  const [message, setMessage] = useState({ error: false, msg: "" });

  const {
    complaint,
    illnessHistory,
    bloodPressure,
    pulseRate,
    weight,
    temperature,
    date,
    physicalExamination,
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
      complaint,
      illnessHistory,
      bloodPressure,
      pulseRate,
      weight,
      temperature: `${temperature}°C`,
      date,
      physicalExamination,
      diagnosis,
      treatment,
      patientId: id,
    };

    try {
      const response = await addDiagnosis(newOpd);
      if (response.status == 201) {
        setMessage({ error: false, msg: response.data.message });

        setOpdDetail({
          complaint: "",
          illnessHistory: "",
          bloodPressure: "",
          pulseRate: "",
          weight: "",
          temperature: "",
          date: "",
          physicalExamination: "",
          diagnosis: "",
          treatment: "",
        });
      } else if (response.status == 440) {
        setMessage({ error: true, msg: response.data.message });
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      } else {
        setMessage({
          error: true,
          msg: response.data.error
            ? response.data.error
            : response.data.message,
        });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <>
      <div className="p-1 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
            className="position-absolute top-10 start-50 translate-middle-x w-50"
            style={{ zIndex: 1 }}
          >
            {message?.msg}
          </Alert>
        )}{" "}
      </div>
      <div
        className="container-fluid mt-1"
        style={{ width: "94%", marginLeft: "2.5rem" }}
      >
        <form
          id="Findings"
          className="card shadow mb-5"
          onSubmit={handleSubmit}
        >
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
                          name="case_no"
                          placeholder="Enter Case Number"
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
                          onChange={getOpd}
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
                        <textarea
                          className="form-control "
                          type="text"
                          name="illnessHistory"
                          onChange={getOpd}
                          value={illnessHistory}
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
                        <div className="col-sm-3">
                          <label>Blood Pressure</label>{" "}
                          <input
                            className="form-control"
                            type="number"
                            name="bloodPressure"
                            onChange={getOpd}
                            value={bloodPressure}
                            placeholder="BP"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Temperature</label>{" "}
                          <input
                            className="form-control"
                            type="number"
                            name="temperature"
                            onChange={getOpd}
                            value={temperature}
                            placeholder="&deg;C"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Weight</label>{" "}
                          <input
                            className="form-control"
                            type="text"
                            name="weight"
                            onChange={getOpd}
                            value={weight}
                            placeholder="KG"
                          />
                        </div>
                        <div className="col-sm-3">
                          <label>Pulse Rate</label>{" "}
                          <input
                            className="form-control"
                            type="number"
                            name="pulseRate"
                            onChange={getOpd}
                            value={pulseRate}
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
                          name="physicalExamination"
                          onChange={getOpd}
                          value={physicalExamination}
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
    </>
  );
};

export default AddDiagnostic;
