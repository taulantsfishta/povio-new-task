const { body, param, query, validationResult } = require("express-validator");

const signupauth = () => {
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
const updatePassword = () => {
  return [
    body("old_password")
      .not()
      .isEmpty()
      .withMessage("is empty")
      .isString()
      .withMessage("is not a string")
      .isLength({ min: 6 })
      .withMessage("minimum length 6 char"),
    body("new_password")
      .not()
      .isEmpty()
      .withMessage("is empty")
      .isString()
      .withMessage("is not a string")
      .isLength({ min: 6 })
      .withMessage("minimum length 6 char")
      .custom((value, { req }) => value !== req.body.old_password)
      .withMessage("is the same with old_password"),
  ];
};
const validateauth = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  let extractedErrors = new Array();
  errors.array().map((err) => extractedErrors.push([err.param, err.msg]));
  return res.json({
    status: false,
    message: extractedErrors[0][0] + " " + extractedErrors[0][1],
  });
};

module.exports = { signupauth, updatePassword, validateauth };
