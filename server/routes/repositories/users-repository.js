import pool from "../../db.js";

export default {
  async getUsersByRole(role) {
    return await pool.query("SELECT * FROM users WHERE user_role = $1", [role]);
  },
  async getAllUsers() {
    return await pool.query("SELECT * FROM users");
  },
  async createUser(name, email, hashedPassword) {
    return await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING user_role, user_id, user_name, user_email",
      [name, email, hashedPassword]
    );
  },
  async updateUserRole(role, userId) {
    return await pool.query(
      "UPDATE users SET user_role = $1 WHERE user_id = $2 RETURNING user_role, user_id, user_name, user_email",
      [role, userId]
    );
  },
  async getUserByEmail(email) {
    return await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
  },
};
