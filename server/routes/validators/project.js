import { check, validationResult } from "express-validator";

const handleError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

const validateComment = [
  check(
    "comment_description",
    "length should be from 2 to 1000 symbols"
  ).isLength({
    min: 2,
    max: 1000,
  }),
  (req, res, next) => handleError(req, res, next),
];

const validateTask = [
  check("task_name", "length should be from 10 to 50 symbols").isLength({
    min: 10,
    max: 50,
  }),
  (req, res, next) => handleError(req, res, next),
];

const validateProject = [
  check("project_name", "length should be from 10 to 50 symbols").isLength({
    min: 10,
    max: 50,
  }),
  (req, res, next) => handleError(req, res, next),
];
export { validateProject, validateTask, validateComment };
