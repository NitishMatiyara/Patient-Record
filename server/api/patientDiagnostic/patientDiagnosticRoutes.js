import express from "express";
import PatientDiagnosticController from "./patientDiagnosticController.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/add", checkUserAuth, PatientDiagnosticController.addDiagnosis);
router.get(
  "/getAll",
  checkUserAuth,
  PatientDiagnosticController.getAllDiagnosis
);
router.get("/get", checkUserAuth, PatientDiagnosticController.getDiagnosis);
router.put(
  "/update",
  checkUserAuth,
  PatientDiagnosticController.updateDiagnosis
);
router.delete(
  "/delete",
  checkUserAuth,
  PatientDiagnosticController.deleteDiagnosis
);

export default router;
