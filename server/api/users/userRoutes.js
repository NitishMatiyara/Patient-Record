import express from "express";
const router = express.Router();
import UserController from "./userController.js";
import checkUserAuth from "../../middlewares/auth-middleware.js";

// ROute Level Middleware - To Protect Route
router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

// Public Routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.get("/user/verify-email", UserController.userVerifyEmail);

// Protected Routes
router.post("/changepassword", UserController.changeUserPassword);
router.get("/loggeduser", UserController.loggedUser);

router.post(
  "/send-reset-password-email",
  UserController.sendUserPasswordResetEmail
);
router.post("/reset-password/:id/:token", UserController.userPasswordReset);

export default router;
