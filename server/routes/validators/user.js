import { check, validationResult } from "express-validator";

const handleError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

const validateUser = [
  check("email", "Insufficient email length").isLength({ min: 10 }),
  check("email", "Invalid email").isEmail(),
  check("password", "Insufficient password length").isLength({ min: 4 }),
  (req, res, next) => handleError(req, res, next),
];

export { validateUser };
