import express from "express";
import PatientPaymentController from "./patientPaymentController.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/add", checkUserAuth, PatientPaymentController.addPayment);
router.get("/getAll", checkUserAuth, PatientPaymentController.getAllPayments);
router.get("/get", checkUserAuth, PatientPaymentController.getPayment);
router.put("/update", checkUserAuth, PatientPaymentController.updatePayment);
router.delete("/delete", checkUserAuth, PatientPaymentController.deletePayment);

export default router;
