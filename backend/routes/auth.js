import { Router } from "express";
import { validateRequest, jwtAuthorization } from "../middlewares/index.js";
import { authSchemas } from "../zodSchemas/index.js";
import { authControllers } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Auth route is working");
});

//signup
authRouter.post(
  "/signup",
  validateRequest(authSchemas.signUpSchema),
  authControllers.signUpController,
);

//verify otp
authRouter.post(
  "/verify-otp",
  validateRequest(authSchemas.otpSchema),
  jwtAuthorization,
  authControllers.verifyOtpController,
);

//signin
authRouter.post(
  "/signin",
  validateRequest(authSchemas.signInSchema),
  authControllers.signInController,
);

//forgot password
authRouter.post(
  "/forgot-password",
  validateRequest(authSchemas.forgotPasswordSchema),
  authControllers.forgotPasswordController,
);

//reset password
authRouter.post(
  "/reset-password",
  jwtAuthorization,
  validateRequest(authSchemas.resetPasswordSchema),
  authControllers.resetPasswordController,
);

//change password
authRouter.post(
  "/change-password",
  jwtAuthorization,
  validateRequest(authSchemas.changePasswordSchema),
  authControllers.changePasswordController,
);

export default authRouter;
