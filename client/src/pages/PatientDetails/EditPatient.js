import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row, Alert, Badge } from "react-bootstrap";
import { getPatient, updatePatient } from "../../services/api/patientDetail";

function EditPatient() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [patientDetail, setPatientDetail] = useState({});

  const {
    _id,
    case_no,
    firstname,
    lastname,
    middlename,
    age,
    city,
    birthdate,
    address,
    mobile,
    gender,
    civilstatus,
  } = patientDetail;

  const [message, setMessage] = useState({ error: false, msg: "" });

  let name, value;
  const editPatient = (e) => {
    name = e.target.name;
    value = e.target.value;

    setPatientDetail({ ...patientDetail, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (
      firstname === "" ||
      lastname === "" ||
      age === "" ||
      city === "" ||
      birthdate === "" ||
      address === "" ||
      mobile === "" ||
      gender === "" ||
      civilstatus === ""
    ) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const updatedPatient = {
      case_no,
      firstname,
      lastname,
      middlename,
      age,
      city,
      birthdate,
      address,
      mobile,

      gender,
      civilstatus,
    };

    try {
      const response = await updatePatient(id, updatedPatient);
      if (response.status == 201) {
        setMessage({ error: false, msg: response.data.message });
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

  useEffect(() => {
    editHandler(id);
  }, []);
  const editHandler = async (id) => {
    const response = await getPatient(id);
    setPatientDetail(response.data[0]);
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
        className="container-fluid mt-1 "
        style={{ width: "89%", marginLeft: "2.5rem" }}
      >
        <Form
          onSubmit={handleSubmit}
          className="card shadow mb-5"
          style={{ height: "85vh" }}
        >
          <div className="card-header text-center">
            <span className="fs-5 font-weight-bold">Edit Patient</span>
          </div>
          <div className="fs-6 mx-3 my-2">
            <span>Case No : </span>
            <input
              type="number"
              value={case_no}
              name="case_no"
              onChange={editPatient}
              className="text-center"
            />
          </div>
          <Row className="mb-2 px-3">
            <Form.Group as={Col}>
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                name="firstname"
                value={firstname}
                onChange={editPatient}
                type="text"
                placeholder="Firstname"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>MiddleName</Form.Label>
              <Form.Control
                name="middlename"
                value={middlename}
                onChange={editPatient}
                type="text"
                placeholder="Middlename"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>LastName</Form.Label>
              <Form.Control
                name="lastname"
                value={lastname}
                onChange={editPatient}
                type="text"
                placeholder="Lastname"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-2 px-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              value={address}
              onChange={editPatient}
              placeholder="Enter address"
            />
          </Form.Group>
          <Row className="mb-2 px-3">
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={city}
                onChange={editPatient}
                type="text"
                placeholder="City"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Civil Status</Form.Label>
              <Form.Select
                name="civilstatus"
                value={civilstatus}
                onChange={editPatient}
              >
                <option>--Select--</option>
                <option>Married</option>
                <option>Single</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                name="birthdate"
                value={birthdate}
                onChange={editPatient}
                type="date"
                placeholder="Birthdate"
              />
            </Form.Group>
          </Row>

          <Row className="mb-2 px-3">
            <Form.Group as={Col}>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={age}
                onChange={editPatient}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={gender} onChange={editPatient}>
                <option>--Select--</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                name="mobile"
                value={mobile}
                onChange={editPatient}
              />
            </Form.Group>
          </Row>

          <Button
            variant="success"
            type="submit"
            style={{ width: "40%", alignSelf: "center" }}
            className="m-4 text-lg"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

export default EditPatient;
