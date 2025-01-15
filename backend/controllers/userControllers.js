import {
  responseMessages,
  responseUtil,
  uploadToCloudinary,
} from "../utils/index.js";
import { User } from "../models/index.js";

const updateProfileController = async (req, res) => {
  const { userId, name, email, phoneNumber } = req.body;
  const profileImage = req.file;
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return responseUtil.errorResponse(res, 400, "User not found!");
    }
    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber;
    if (profileImage) {
      const profileImageUrl =
        await uploadToCloudinary.uploadProfilePhotoToCloudinary(
          profileImage.path,
        );
      existingUser.imgURL = profileImageUrl;
    }
    await existingUser.save();
    return responseUtil.successResponse(
      res,
      200,
      "Profile updated successfully!",
      {
        user: existingUser,
      },
    );
  } catch (error) {
    console.log(error);
    return responseUtil.errorResponse(res, 500, "Internal server error!");
  }
};

const getProfileController = async (req, res) => {
  const { userId } = req.body;
  try {
    const existingUser = await User.findById(userId);
    return responseUtil.successResponse(
      res,
      200,
      "Profile fetched successfully!",
      {
        user: existingUser,
      },
    );
  } catch (error) {
    console.log(error);
    return responseUtil.errorResponse(res, 500, "Internal server error!");
  }
};

const uploadProfileImageController = async (req, res) => {
  const { userId } = req.body;
  const profileImage = req.file;
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return responseUtil.errorResponse(res, 400, "User not found!");
    }
    if (profileImage) {
      const profileImageUrl =
        await uploadToCloudinary.uploadProfilePhotoToCloudinary(
          profileImage.path,
        );
      existingUser.imgURL = profileImageUrl;
    }
    await existingUser.save();
    return responseUtil.successResponse(
      res,
      200,
      "Profile Picture updated successfully!",
      {
        imgURL: existingUser.imgURL,
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
};

export const userControllers = {
  updateProfileController,
  getProfileController,
  uploadProfileImageController,
};
