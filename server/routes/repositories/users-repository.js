import dataSource from "../../data-source.js";
let Users = dataSource.getRepository("Users");

export default {
  async getUsersByRole(role) {
    return await Users.findBy({
      user_role: role,
    });
  },
  async getAllUsers() {
    return await Users.find();
  },
  async createUser(name, email, hashedPassword) {
    return await Users.save({
      user_name: name,
      user_email: email,
      user_password: hashedPassword,
    });
  },
  async updateUserRole(role, userId) {
    let user = await Users.findOneBy({
      user_id: userId,
    });
    user.user_role = role;

    return await Users.save(user);
  },
  async getUserByEmail(email) {
    return await Users.findOneBy({
      user_email: email,
    });
  },
};
