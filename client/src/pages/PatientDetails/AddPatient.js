import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Alert, Badge } from "react-bootstrap";
import { addPatient, getAllPatients } from "../../services/api/patientDetail";

function AddPatient() {
  let navigate = useNavigate();

  const [count, setCount] = useState();
  useEffect(() => {
    const caseCount = async () => {
      const data = await getAllPatients();
      setCount(data?.data?.length + 1);
    };
    caseCount();
  });

  const [patientDetail, setPatientDetail] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    age: "",
    city: "",
    birthdate: "",
    address: "",
    mobile: "",

    gender: "",
    civilstatus: "",
  });

  const {
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
  const getPatient = (e) => {
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
    const newPatient = {
      case_no: count,
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
      const response = await addPatient(newPatient);
      if (response.status == 201) {
        setMessage({ error: false, msg: response.data.message });

        setPatientDetail({
          firstname: "",
          lastname: "",
          middlename: "",
          age: "",
          city: "",
          birthdate: "",
          address: "",
          mobile: "",

          gender: "",
          civilstatus: "",
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
      <div>
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
        style={{ width: "83vw", marginLeft: "14rem" }}
      >
        <Form
          onSubmit={handleSubmit}
          className="card shadow mb-5"
          style={{ height: "85vh" }}
        >
          <div className="card-header text-center">
            <span className="fs-5 font-weight-bold">Add Patient</span>
          </div>
          <div className="fs-6 mx-3 my-2">
            <span>Case No : </span>
            <Badge bg="secondary" className="ml-2">
              {count}
            </Badge>
          </div>

          <Row className="mb-2 px-3">
            <Form.Group as={Col}>
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                className="text-capitalize"
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
                className="text-capitalize"
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
                className="text-capitalize"
                name="lastname"
                value={lastname}
                onChange={getPatient}
                type="text"
                placeholder="Lastname"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-2 px-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              className="text-capitalize"
              name="address"
              value={address}
              onChange={getPatient}
              placeholder="Enter address"
            />
          </Form.Group>
          <Row className="mb-2 px-3">
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                className="text-capitalize"
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
                className="text-capitalize"
                name="birthdate"
                value={birthdate}
                onChange={getPatient}
                type="date"
                placeholder="Birthdate"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Civil Status</Form.Label>
              <Form.Select
                name="civilstatus"
                value={civilstatus}
                onChange={getPatient}
              >
                <option>--Select--</option>
                <option value={"Married"}>Married</option>
                <option value={"Single"}>Single</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-2 px-3">
            <Form.Group as={Col}>
              <Form.Label>Age</Form.Label>
              <Form.Control
                className="text-capitalize"
                type="number"
                name="age"
                value={age}
                onChange={getPatient}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={gender} onChange={getPatient}>
                <option>--Select--</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                className="text-capitalize"
                type="number"
                name="mobile"
                value={mobile}
                onChange={getPatient}
              />
            </Form.Group>
          </Row>

          <Button
            variant="success"
            type="submit"
            style={{ width: "40%", alignSelf: "center" }}
            className="my-5 text-lg"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddPatient;
