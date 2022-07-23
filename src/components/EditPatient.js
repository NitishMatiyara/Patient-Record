import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import PatientData from "../services/patientRecords";

function EditPatient() {
  let navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    editHandler();
  }, []);

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
      if (id !== undefined && id !== "") {
        await PatientData.updatePatient(id, newPatient);
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await PatientData.addPatients(newPatient);
        setMessage({ error: false, msg: "New Patient added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
    setPatientDetail("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await PatientData.getPatient(id);
      console.log("the record is :", docSnap.data());
      setPatientDetail(docSnap.data());
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <>
      <div className="p-4 box">
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
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col}>
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
              <option>Married</option>
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
              <option>Male</option>
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
          Update record
        </Button>
      </Form>
    </>
  );
}

export default EditPatient;
