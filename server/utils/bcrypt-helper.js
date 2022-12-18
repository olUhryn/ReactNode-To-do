import bcrypt from "bcrypt";

const validatePassword = (password, userHashedPassword) => {
  bcrypt.compare(password, userHashedPassword);
};

export { validatePassword };
