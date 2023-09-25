import UserModel from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import axios from "axios";
import qs from "qs";
import validate from "deep-email-validator";
import crypto from "crypto";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const options = {
      method: "GET",
      url: "https://validect-email-verification-v1.p.rapidapi.com/v1/verify",
      params: {
        email: email,
      },
      headers: {
        "X-RapidAPI-Key": "376a97b0b7mshd9e3d67b75f51cfp1865d7jsn4b821c9664d4",
        "X-RapidAPI-Host": "validect-email-verification-v1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    if (response.data.status == "invalid" || response.data.public == "false") {
      return res.status(400).send({
        status: "failure",
        message: "Please provide a valid email address.",
      });
    }
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (name && email && password && confirmPassword) {
        if (password === confirmPassword) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const token = crypto.randomBytes(32).toString("hex");
            const doc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              verifyToken: token,
            });
            const saved_user = await doc.save();
            //---------//
            const link = `${process.env.BACKEND_SERVER_URL}/auth/user/verify-email/${saved_user._id}/${token}`;
            await sendEmail(email, link);

            //---------//
            res.status(201).send({
              status: "success",
              message:
                "A verification link sent to mail. Please, verify to continue.",
            });
          } catch (error) {
            console.log(error);
            res
              .status(500)
              .send({ status: "failed", message: "Internal Server Error" });
          }
        } else {
          res.send({
            status: "failed",
            message: "Password and Confirm Password doesn't match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
          if (!user.verified) {
            res.send({ status: "failed", message: "Email not verified" });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && user.verified == true && isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.cookie("auth", token, {
              expires: new Date(Date.now() + 3600 * 1000 * 24 * 1),
              httpOnly: true,
              sameSite: "none",
              secure: true,
            });
            res.send({
              status: "success",
              message: "Login Success",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        res.send({
          status: "failed",
          message: "New Password and Confirm New Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "success",
          message: "Password changed succesfully",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  };

  static loggedUser = async (req, res) => {
    res.send({ status: "success", user: req.user });
  };

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
        console.log(link);
        // // Send Email
        // let info = await transporter.sendEmail({
        //   from: process.env.EMAIL_FROM,
        //   to: user.email,
        //   subject: "GeekShop - Password Reset Link",
        //   html: `<a href=${link}>Click Here</a> to Reset Your Password`
        // })
        res.send({
          status: "success",
          message: "Password Reset Email Sent... Please Check Your Email",
        });
      } else {
        res.send({ status: "failed", message: "Email doesn't exists" });
      }
    } else {
      res.send({ status: "failed", message: "Email Field is Required" });
    }
  };

  static userPasswordReset = async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          res.send({
            status: "failed",
            message: "New Password and Confirm New Password doesn't match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.send({
            status: "success",
            message: "Password Reset Successfully",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Invalid Token" });
    }
  };

  static getGoogleOAuthTokens = async (code) => {
    const url = "https://oauth2.googleapis.com/token"; // link to api to exchange code for token.
    const values = {
      code,
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
      grant_type: "authorization_code",
    };
    try {
      const res = await axios.post(url, qs.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  static getGoogleUser = async (id_token, access_token) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  static userSocialLogin = async (req, res, googleUser) => {
    const { name, email } = googleUser;
    const password = email;
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        // Add the user
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new UserModel({
          name: name,
          email: email,
          password: hashPassword,
          verified: true,
        });
        await doc.save();
      }
      const saved_user = await UserModel.findOne({ email: email });

      // Generate JWT Token
      const token = jwt.sign(
        { userID: saved_user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5d" }
      );
      res.cookie("auth", token, {
        expires: new Date(Date.now() + 3600 * 1000 * 24 * 1),
        sameSite: "none",
        secure: true,
      });
      return res.redirect(
        `${process.env.BACKEND_SERVER_URL}/auth/user/social-sign-in/success`
      );
    } catch (error) {
      return res.redirect(
        `${process.env.BACKEND_SERVER_URL}/auth/user/social-sign-in/failure`
      );
    }
  };
  static userVerifyEmail = async (req, res) => {
    try {
      const { userId, token } = req.query;
      const user = await UserModel.findOne({ _id: userId, verifyToken: token });
      if (!user)
        return res
          .status(400)
          .send({ status: "failed", message: "Invalid user id or token" });

      const isVerified = await UserModel.findByIdAndUpdate(userId, {
        $set: { verified: true },
      });
      res.send({
        status: "success",
        message: "Email verified successfully. Kindly log in.",
      });
    } catch (error) {
      res.send({ status: "failed", message: "Email not verified" });
    }
  };
}
export default UserController;
