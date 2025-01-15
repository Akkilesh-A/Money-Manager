import User from "../models/userSchema.js";
import { responseMessages, responseUtil } from "../utils/index.js";

const emailVerified = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return responseUtil.errorResponse(res, 404, "User not found");
    }

    if (!user.isEmailVerified) {
      return responseUtil.errorResponse(res, 400, "User is not verified");
    }

    next();
  } catch (error) {
    console.error("Email verification middleware error:", error);
    return responseUtil.errorResponse(
      res,
      500,
      responseMessages.InternalServerError,
    );
  }
};

export default emailVerified;
