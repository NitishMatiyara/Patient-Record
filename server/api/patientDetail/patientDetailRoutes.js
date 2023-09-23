import express from "express";
import PatientDetailController from "./patientDetailController.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/add", checkUserAuth, PatientDetailController.addPatient);
router.get("/getAll", checkUserAuth, PatientDetailController.getAllPatients);
router.get("/get", checkUserAuth, PatientDetailController.getPatient);
router.put("/update", checkUserAuth, PatientDetailController.updatePatient);
router.delete("/delete", checkUserAuth, PatientDetailController.deletePatient);

export default router;
