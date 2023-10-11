// const constants = require("../constants");
import constants from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR: // if the status code is 400, then need to pass that it is validation failed
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND: // if status is 404, then need to pass that it is not found
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED: // if status is 404, then need to pass that it is unauthorized
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN: // if status is 404, then need to pass that it is forbidden
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR: // if status is 404, then need to pass that it is a server error
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error!");
      break;
  }
};
// need to create a constants file to handle all error codes -- constants.js
// module.exports = errorHandler;
export default errorHandler;
