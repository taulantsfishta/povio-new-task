const { body, param, query, validationResult } = require("express-validator");
const signup = () => {
  return [
    body("name")
      .not()
      .isEmpty()
      .withMessage("is empty")
      .isString()
      .withMessage("is not a string"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("is empty")
      .isLength({ min: 6 })
      .withMessage("minimum length 6 char"),
  ];
};
const userId = () => {
  return [
    param("id")
      .not()
      .isEmpty()
      .withMessage("is empty")
      .isNumeric()
      .withMessage("should be numeric"),
  ];
};
const validateuser = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push([err.param, err.msg]));
  return res.json({
    status: "false",
    message: extractedErrors[0][0] + " " + extractedErrors[0][1],
  });
};

module.exports = { signup, userId, validateuser };
