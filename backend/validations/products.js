const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateProductInput = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("Name must be between 2 and 20 characters")
    .matches(/[a-zA-Z]/)
    .withMessage("Product name contains invalid values"),
  handleValidationErrors,
];

module.exports = validateProductInput;