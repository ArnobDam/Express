const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateProductInput = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 characters")
    .matches(/[a-zA-Z]/)
    .withMessage("Product name contains invalid values"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .matches(/[0-9]/)
    .withMessage("Product name contains non numeric values"),
  handleValidationErrors,
];

module.exports = validateProductInput;
