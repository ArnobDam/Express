const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateOrderInput = [
  // check("number")
  //   .isNumeric({ min: 1 })
  //   .withMessage("Order number must be greater than one"),
  // .exists({ checkFalsy: true })
  // .withMessage("Category title is required")
  // .isString()
  // .withMessage("Category name must be a string")
  // .isLength({ min: 1, max: 15 })
  // .withMessage("Name must be between 1 and 15 characters"),
  handleValidationErrors,
];

module.exports = validateOrderInput;
