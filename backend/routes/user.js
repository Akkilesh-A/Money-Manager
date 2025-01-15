import { Router } from "express";
import { userControllers } from "../controllers/userControllers.js";
import { emailVerified, jwtAuthorization } from "../middlewares/index.js";
import multer from "multer";
import { validateRequest } from "../middlewares/index.js";
import { userSchemas } from "../zodSchemas/index.js";

const upload = multer({ dest: "uploads/" });
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("User route is working");
});

userRouter.patch(
  "/update-profile",
  upload.single("profileImage"),
  jwtAuthorization,
  emailVerified,
  validateRequest(userSchemas.updateProfileSchema),
  userControllers.updateProfileController,
);

userRouter.get(
  "/get-profile",
  jwtAuthorization,
  emailVerified,
  userControllers.getProfileController,
);

userRouter.patch(
  "/upload-profile-image",
  upload.single("profileImage"),
  jwtAuthorization,
  emailVerified,
  validateRequest(userSchemas.updateProfileSchema),
  userControllers.uploadProfileImageController,
);

export default userRouter;
