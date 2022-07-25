import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import PatientData from "../services/patientRecords";

function AddPatient() {
  let navigate = useNavigate();
  const [patientDetail, setPatientDetail] = useState({
    casenum: "",
    firstname: "",
    lastname: "",
    middlename: "",
    age: "",
    city: "",
    birthdate: "",
    address: "",
    mobile: "",
    occupation: "",
    gender: "",
    civil: "",
  });

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

  const [message, setMessage] = useState({ error: false, msg: "" });

  let name, value;
  const getPatient = (e) => {
    name = e.target.name;
    value = e.target.value;

    setPatientDetail({ ...patientDetail, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (
      casenum === "" ||
      firstname === "" ||
      lastname === "" ||
      middlename === "" ||
      age === "" ||
      city === "" ||
      birthdate === "" ||
      address === "" ||
      mobile === "" ||
      occupation === "" ||
      gender === "" ||
      civil === ""
    ) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newPatient = {
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
    };
    console.log(newPatient);

    try {
      await PatientData.addPatients(newPatient);
      setMessage({ error: false, msg: "New Patient added successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <>
      <div className="p-3 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}{" "}
      </div>
      <Form onSubmit={handleSubmit} className="card shadow p-2">
        <div className="card-header py-3">
          <h5 className="mb-2 text-gray-800"> Add Patient</h5>
        </div>
        <Form.Group as={Col} className="p-0">
          <Form.Label>Case No.</Form.Label>
          <Form.Control
            name="casenum"
            value={casenum}
            onChange={getPatient}
            type="text"
            placeholder=""
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              name="firstname"
              value={firstname}
              onChange={getPatient}
              type="text"
              placeholder="Firstname"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>MiddleName</Form.Label>
            <Form.Control
              name="middlename"
              value={middlename}
              onChange={getPatient}
              type="text"
              placeholder="Middlename"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>LastName</Form.Label>
            <Form.Control
              name="lastname"
              value={lastname}
              onChange={getPatient}
              type="text"
              placeholder="Lastname"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            value={address}
            onChange={getPatient}
            placeholder="Enter address"
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={city}
              onChange={getPatient}
              type="text"
              placeholder="City"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              name="birthdate"
              value={birthdate}
              onChange={getPatient}
              type="date"
              placeholder="Birthdate"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Civil Status</Form.Label>
            <Form.Select name="civil" value={civil} onChange={getPatient}>
              <option selected>Married</option>
              <option>Single</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Age</Form.Label>
            <Form.Control name="age" value={age} onChange={getPatient} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" value={gender} onChange={getPatient}>
              <option selected>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Mobile</Form.Label>
            <Form.Control name="mobile" value={mobile} onChange={getPatient} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            name="occupation"
            value={occupation}
            onChange={getPatient}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddPatient;
