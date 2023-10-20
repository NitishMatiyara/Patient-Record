import PatientDiagnosticModel from "./patientDiagnosticModel.js";
import PatientDetailModel from "../patientDetail/patientDetailModel.js";

class PatientDiagnosticController {
  static addDiagnosis = async (req, res) => {
    try {
      const payload = req?.body?.diagnosticData;
      payload.userId = req.user._id;
      let data;
      data = await PatientDiagnosticModel.findOne(payload);
      if (data != null) {
        return res.status(409).send({
          status: "failed",
          message: "Diagnosis info already exists.",
        });
      } else {
        data = new PatientDiagnosticModel(payload);
        await data.save();
        const updatedPatient = await PatientDetailModel.findOneAndUpdate(
          { _id: payload.patientId },
          { $push: { diagnostic: data._id } }
        );

        return res.status(201).send({
          status: "success",
          message: "Diagnosis info added successfully",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: "failed",
        message: "Unable to add data.",
        error: error,
      });
    }
  };
  static getDiagnosis = async (req, res) => {
    try {
      const { id } = req.query;
      const data = await PatientDiagnosticModel.findOne({ _id: id });
      data == null
        ? res
            .status(400)
            .send({ status: "failed", message: "Invalid Id passed" })
        : res.status(200).send({
            status: "success",
            message: "Diagnostic detail fetched successfully",
            data: data,
          });
    } catch (error) {
      if (error.name == "CaseError")
        return res
          .status(400)
          .send({ status: "failed", message: "Invalid Diagnostic Id" });

      return res.status(400).send({
        status: "failed",
        message: "Unable to get data",
        error: error,
      });
    }
  };
  static getAllDiagnosis = async (req, res) => {
    try {
      const { patientId } = req?.query;
      const data = await PatientDiagnosticModel.find({ patientId });
      return res.status(200).send({
        status: "success",
        message: "Diagnosis info fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to get data",
        error: error,
      });
    }
  };

  static updateDiagnosis = async (req, res) => {
    try {
      const payload = req?.body?.diagnosticData;
      const { id } = req?.query;

      let data;
      data = await PatientDiagnosticModel.findOne(payload);
      if (data != null) {
        return res
          .status(409)
          .send({ status: "failed", message: "Diagnostic already exists." });
      } else {
        const updatedPayment = await PatientDiagnosticModel.findByIdAndUpdate(
          { _id: id },
          { $set: payload }
        );
        return res.status(201).send({
          status: "success",
          message: "Diagnostic detail updated successfully",
          data: data,
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to update payment",
        error: error,
      });
    }
  };
  static deleteDiagnosis = async (req, res) => {
    try {
      const { patientId } = req.query;
      const data = await PatientDiagnosticModel.findByIdAndDelete({
        _id: patientId,
      });
      return res.status(201).send({
        status: "success",
        message: "Diagnosis info deleted successfully",
      });
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to delete daignosis data",
        error: error,
      });
    }
  };
}

export default PatientDiagnosticController;
