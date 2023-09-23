import PatientDetailModel from "./patientDetailModel.js";
import PatientDetailValidation from "./patientDetailValidate.js";

class PatientDetailController {
  static addPatient = async (req, res) => {
    try {
      const {
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
      } = req.body.patientDetail;

      // Capitalizing name initials
      const firstName = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      const middleName =
        middlename.charAt(0).toUpperCase() + middlename.slice(1);
      const lastName = lastname.charAt(0).toUpperCase() + lastname.slice(1);

      const patient_detail = {
        gender,
        case_no,
        firstname: firstName,
        lastname: lastName,
        middlename: middleName,
        age,
        city,
        birthdate,
        address,
        mobile,
        civilstatus,
        userId: req.user._id.toString(),
      };
      let patientData;
      const { value, error } = await PatientDetailValidation.addPatient(
        patient_detail
      );
      if (error) {
        return res
          .status(400)
          .send({ status: "failed", message: error?.details[0].message });
      }
      const isCaseExist = await PatientDetailModel.findOne({
        case_no,
        userId: req.user._id.toString(),
      });
      if (isCaseExist != null)
        return res
          .status(409)
          .send({ status: "failed", message: "Case no. already exists." });
      patientData = await PatientDetailModel.findOne({
        userId: req.user._id.toString(),
        firstname,
        middlename,
        lastname,
      });
      if (patientData != null) {
        return res
          .status(409)
          .send({ status: "failed", message: "Patient already exists." });
      } else {
        patientData = new PatientDetailModel(patient_detail);
        await patientData.save();
        return res
          .status(201)
          .send({ status: "success", message: "Patient added successfully" });
      }
    } catch (error) {
      console.log(error);
      if (error?.code == 11000) {
        return res.status(400).send({
          status: "failed",
          message: `${JSON.stringify(error.keyValue)} already exists`,
        });
      }

      return res.status(400).send({
        status: "failed",
        message: "Unable to add patient",
        error: error,
      });
    }
  };
  static getPatient = async (req, res) => {
    try {
      const userId = req.user._id.toString();
      const { patientId } = req.query;
      const patientData = await PatientDetailModel.find({
        _id: patientId,
        userId: userId,
      });
      return res.status(200).send({
        status: "success",
        message: "Patient detail fetched successfully",
        data: patientData,
      });
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to add patient",
        error: error,
      });
    }
  };
  static getAllPatients = async (req, res) => {
    try {
      const userId = req.user._id.toString();
      const patientData = await PatientDetailModel.find({ userId: userId });
      return res.status(200).send({
        status: "success",
        message: "Patient details fetched successfully",
        data: patientData,
      });
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to add patient",
        error: error,
      });
    }
  };
  static updatePatient = async (req, res) => {
    try {
      const {
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
      } = req?.body?.patientDetail;
      const { patientId } = req?.query;
      const patient_detail = {
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

      let patientData;
      const { value, error } = await PatientDetailValidation.updatePatient(
        patient_detail
      );
      if (error) {
        return res
          .status(400)
          .send({ status: "failed", message: error?.details[0].message });
      }
      patientData = await PatientDetailModel.findOne({
        userId: req.user._id.toString(),
        case_no,
        firstname,
        middlename,
        lastname,
      });

      if (patientData != null) {
        return res
          .status(409)
          .send({ status: "failed", message: "Patient already exists." });
      } else {
        const updatedPatient = await PatientDetailModel.findByIdAndUpdate(
          { _id: patientId },
          { $set: patient_detail }
        );
        return res.status(201).send({
          status: "success",
          message: "Patient detail updated successfully",
        });
      }
    } catch (error) {
      if (error?.code == 11000) {
        return res.status(400).send({
          status: "failed",
          message: `${JSON.stringify(error.keyValue)} already exists`,
        });
      }

      return res.status(400).send({
        status: "failed",
        message: "Unable to update patient",
        error: error,
      });
    }
  };
  static deletePatient = async (req, res) => {
    try {
      const { patientId } = req.query;
      const patientData = await PatientDetailModel.findByIdAndDelete({
        _id: patientId,
      });
      return res
        .status(201)
        .send({ status: "success", message: "Patient deleted successfully" });
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to delete patient",
        error: error,
      });
    }
  };
}

export default PatientDetailController;
