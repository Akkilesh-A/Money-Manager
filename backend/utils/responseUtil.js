const successResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
    error: null,
  });
};

const errorResponse = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    data: null,
    error,
  });
};

const infoResponse = (res, statusCode, message, data = null, error = null) => {
  return res.status(statusCode).json({
    status: "info",
    message,
    data,
    error,
  });
};

export const responseUtil = {
  successResponse,
  errorResponse,
  infoResponse,
};
