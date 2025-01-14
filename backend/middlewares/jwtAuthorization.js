import jwt from "jsonwebtoken";
import { responseUtil } from "../utils/index.js";

const jwtAuthorization = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (err) {
    return responseUtil.errorResponse(res, 401, "Unauthorized", {
      error: err.message,
      redirect: "/signin",
    });
  }
};

export default jwtAuthorization;
