const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateOrderInput = [
  check("products")
    .exists({ checkFalsy: true })
    .withMessage("Products must exist")
    .isLength({min: 1})
    .withMessage("Products cannot be empty"),   
  handleValidationErrors,
];

module.exports = validateOrderInput;
