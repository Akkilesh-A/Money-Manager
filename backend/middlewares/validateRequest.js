import { responseUtil } from "../utils/index.js";

const validateRequest = (zodSchema) => {
  return (req, res, next) => {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (error) {
      responseUtil.errorResponse(res, 400, "Missing fields", error.message);
    }
  };
};

export default validateRequest;
