import { Router } from "express";
import { validateRequest, jwtAuthorization } from "../middlewares/index.js";
import { authSchemas } from "../zodSchemas/index.js";
import User from "../models/userSchema.js";
import {
  responseUtil,
  responseMessages,
  generateJwtToken,
  sendMail,
} from "../utils/index.js";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Auth route is working");
});

//signup
authRouter.post(
  "/signup",
  validateRequest(authSchemas.signUpSchema),
  async (req, res) => {
    const { name, email, password, confirmPassword, phoneNumber } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Password and confirm password do not match",
        data: null,
      });
    }

    //check if user already exists
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        if (existingUser.isEmailVerified) {
          const token = generateJwtToken(existingUser._id);
          return responseUtil.infoResponse(res, 400, "User already exists", {
            redirect: "/signin",
            token,
          });
        }
        const html = `<p>Your OTP is ${existingUser.otp}</p>`;
        await sendMail(existingUser.email, "OTP Verification", "", html);
        const token = generateJwtToken(existingUser._id);
        return responseUtil.infoResponse(
          res,
          400,
          "User already exists but email is not verified!",
          {
            redirect: "/verify-otp",
            token,
          },
        );
      }
    } catch (error) {
      console.log(error);
      return responseUtil.errorResponse(
        res,
        500,
        responseMessages.InternalServerError,
      );
    }

    //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const html = `<p>Your OTP is ${otp}</p>`;
    await sendMail(email, "OTP Verification", "", html);

    //create a new user
    try {
      // const hashedOtp = await bcrypt.hash(otp,10);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        otp,
      });
      const token = generateJwtToken(newUser._id);
      return responseUtil.successResponse(
        res,
        200,
        "User created successfully!",
        {
          newUser,
          redirect: "/verify-otp",
          token,
        },
      );
    } catch (error) {
      console.log(error);
      return responseUtil.errorResponse(
        res,
        500,
        responseMessages.InternalServerError,
      );
    }
  },
);

//verify otp
authRouter.post(
  "/verify-otp",
  validateRequest(authSchemas.otpSchema),
  jwtAuthorization,
  async (req, res) => {
    const { otp, userId } = req.body;
    try {
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return responseUtil.errorResponse(res, 400, "User not found!");
      }
      if (existingUser.otp !== otp) {
        return responseUtil.errorResponse(res, 400, "Invalid OTP!");
      }
      existingUser.isEmailVerified = true;
      await existingUser.save();
      return responseUtil.successResponse(
        res,
        200,
        "OTP verified successfully!",
        {
          redirect: "/signin",
        },
      );
    } catch (error) {
      console.log(error);
      return responseUtil.errorResponse(
        res,
        500,
        responseMessages.InternalServerError,
      );
    }
  },
);

//signin
authRouter.post(
  "/signin",
  validateRequest(authSchemas.signInSchema),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return responseUtil.errorResponse(res, 400, "User not found!");
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isPasswordCorrect) {
        return responseUtil.errorResponse(res, 400, "Invalid password!");
      }
      if (!existingUser.isEmailVerified) {
        const html = `<p>Your OTP is ${existingUser.otp}</p>`;
        await sendMail(existingUser.email, "OTP Verification", "", html);
        const token = generateJwtToken(existingUser._id);
        return responseUtil.infoResponse(res, 400, "User not verified!", {
          redirect: "/verify-otp",
          token,
        });
      }
      const token = generateJwtToken(existingUser._id);
      return responseUtil.successResponse(
        res,
        200,
        "User signed in successfully!",
        {
          redirect: "/dashboard",
          token,
        },
      );
    } catch (error) {
      console.log(error);
      return responseUtil.errorResponse(
        res,
        500,
        responseMessages.InternalServerError,
      );
    }
  },
);

//forgot password
authRouter.post(
  "/forgot-password",
  validateRequest(authSchemas.forgotPasswordSchema),
  async (req, res) => {
    const { email } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return responseUtil.errorResponse(res, 400, "User not found!");
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      existingUser.otp = otp;
      await existingUser.save();
      const html = `<p>Your OTP is ${otp}</p>`;
      await sendMail(existingUser.email, "OTP Verification", "", html);
      const token = generateJwtToken(existingUser._id);
      return responseUtil.successResponse(res, 200, "OTP sent successfully!", {
        redirect: "/reset-password",
        token,
      });
    } catch (error) {
      console.log(error);
      return responseUtil.errorResponse(
        res,
        500,
        responseMessages.InternalServerError,
      );
    }
  },
);

//reset password
authRouter.post(
  "/reset-password",
  jwtAuthorization,
  validateRequest(authSchemas.resetPasswordSchema),
  async (req, res) => {
    const { otp, userId, password } = req.body;
    try {
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return responseUtil.errorResponse(res, 400, "User not found!");
      }
      if (existingUser.otp !== otp) {
        return responseUtil.errorResponse(res, 400, "Invalid OTP!");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
      await existingUser.save();
      return responseUtil.successResponse(
        res,
        200,
        "Password reset successfully!",
        {
          redirect: "/signin",
        },
      );
    } catch (error) {
      console.log(error);
      return responseUtil.errorResponse(
        res,
        500,
        responseMessages.InternalServerError,
      );
    }
  },
);
export default authRouter;
