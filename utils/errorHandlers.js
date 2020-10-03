class ApiError extends Error {
  constructor(errorMessage, errorType, data) {
    super(errorMessage);
    this.data = data;
    this.errorType = errorType;
    this.name = "ApiError";
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    res.status("400").json({
      errorMessage: error.message,
      errorType: error.errorType,
      errorData: error.data,
    });
  } else if (error instanceof Error) {
    res.status("500").json({
      errorMessage: error.message,
      errorData: error.data,
    });
  }
};
module.exports = { ApiError, errorHandler };
