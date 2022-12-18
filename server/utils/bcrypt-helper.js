import bcrypt from "bcrypt";

export default {
  async validatePassword (password, userHashedPassword) {
    await bcrypt.compare(password, userHashedPassword);
  }
}
