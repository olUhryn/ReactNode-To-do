import usersRepository from "../repositories/users-repository.js";

export default {
  async getUsersByRole(role) {
    return await usersRepository.getUsersByRole(role);
  },
  async getAllUsers() {
    return await usersRepository.getAllUsers();
  },
  async createUser(name, email, hashedPassword) {
    return await usersRepository.createUser(name, email, hashedPassword);
  },
  async updateUserRole(role, userId) {
    return await usersRepository.updateUserRole(role, userId);
  },
  async getUserByEmail(email) {
    return await usersRepository.getUserByEmail(email);
  },
};
