import bcrypt from "bcrypt";

const validatePassword = (password, userHashedPassword) => {
  return bcrypt.compare(password, userHashedPassword);
};

export { validatePassword };
