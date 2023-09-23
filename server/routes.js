import express from "express";
const router = express.Router();
import userRoutes from "./api/users/userRoutes.js";
import patientDetailRoutes from "./api/patientDetail/patientDetailRoutes.js";
import patientPaymentRoutes from "./api/patientPayment/patientPaymentRoutes.js";
import patientDiagnosticRoutes from "./api/patientDiagnostic/patientDiagnosticRoutes.js";
import googleOAuthHandler from "./services/auth/googleOAuth.js";

// Load Routes
router.use("/api/auth", userRoutes);
router.use("/api/patient", patientDetailRoutes);
router.use("/api/payment", patientPaymentRoutes);
router.use("/api/diagnostic", patientDiagnosticRoutes);
router.get("/api/oauth/google", googleOAuthHandler);

export default router;
