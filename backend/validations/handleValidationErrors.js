const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errorFormatter = ({ msg }) => msg;
    const errors = validationErrors.formatWith(errorFormatter).mapped();
    const error = Error("Validation Error");
    error.errors = errors;
    error.statusCode = 400;
    error.title = "Validation Error";
    next(error);
  }
  next();
};

module.exports = handleValidationErrors;
