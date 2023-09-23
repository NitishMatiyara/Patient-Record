import UserController from "../../api/users/userController.js";

const googleOAuthHandler = async (req, res) => {
  try {
    const { code } = req.query;
    const { id_token, access_token } =
      await UserController.getGoogleOAuthTokens(code);
    // const googleUser = jwt.decode(id_token)

    //  Get google user from client network request
    const googleUser = await UserController.getGoogleUser(
      id_token,
      access_token
    );

    // Register User if authenticated
    if (!googleUser.verified_email) {
      return res
        .status(403)
        .send({ status: "false", message: "Google account is not verified." });
    } else {
      await UserController.userSocialLogin(req, res, googleUser);
    }
  } catch (err) {
    return res.status(401).send({
      status: "failure",
      message: "Unauthorised access.",
      error: err,
    });
  }
};

export default googleOAuthHandler;
