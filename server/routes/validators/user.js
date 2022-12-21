import { check, validationResult } from "express-validator";

const handleError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

const validateAuth = [
  check("email", "Insufficient email length").isLength({ min: 10 }),
  check("email", "Invalid email").isEmail(),
  check("password", "Insufficient password length").isLength({ min: 4 }),
  (req, res, next) => handleError(req, res, next),
];

const validateUserRole = [
  check("user_role", "Insufficient user role length").isLength({
    min: 7,
    max: 9,
  }),
  (req, res, next) => handleError(req, res, next),
];

const validateUser = [
  check("user_email", "Insufficient email length").isLength({ min: 10 }),
  check("user_email", "Invalid email").isEmail(),
  check("user_password", "Insufficient password length").isLength({ min: 4, max: 30 }),
  check("user_name", "Insufficient name length").isLength({ min: 4, max: 30 }),

  (req, res, next) => handleError(req, res, next),
];

export { validateUser, validateAuth, validateUserRole };
