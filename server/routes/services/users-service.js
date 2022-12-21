import usersRepository from "../repositories/users-repository.js";

export default {
  async getUsersByRole(role) {
    let users = await usersRepository.getUsersByRole(role);
    return users.rows.length ? users.rows : [];
  },
  async getAllUsers() {
    let users = await usersRepository.getAllUsers();
    return users.rows.length ? users.rows : [];
  },
  async createUser(name, email, hashedPassword) {
    let users = await usersRepository.createUser(name, email, hashedPassword);
    return users.rows.length ? users.rows[0] : {};
  },
  async updateUserRole(role, userId) {
    let users = await usersRepository.updateUserRole(role, userId);
    return users.rows.length ? users.rows[0] : {};
  },
  async getUserByEmail(email) {
    let users = await usersRepository.getUserByEmail(email);
    return users.rows.length ? users.rows[0] : null;
  },
};
