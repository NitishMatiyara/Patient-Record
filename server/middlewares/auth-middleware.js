import jwt from "jsonwebtoken";
import UserModel from "../api/users/userModel.js";

var checkUserAuth = async (req, res, next) => {
  let token;

  if (req?.cookies?.auth) {
    try {
      // Get Token from httpOnly cookie
      token = req?.cookies?.auth;

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Get User from Token
      req.user = await UserModel.findById(userID).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res.status(440).send({
      status: "failed",
      message: "Session Expired... Kindly, login again.",
    });
  }
};

export default checkUserAuth;
