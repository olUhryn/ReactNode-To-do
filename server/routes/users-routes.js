import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json({ users: users.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING user_role, user_id, user_name, user_email",
      [req.body.name, req.body.email, hashedPassword]
    );
    console.log(newUser);
    res.json({ users: newUser.rows[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

router.post("/update-user", async (req, res) => {
  try {
    const userRole = req.body.user_role;
    const userId = req.body.user_id;
    const updatedUser = await pool.query(
      "UPDATE users SET user_role = $1 WHERE user_id = $2 RETURNING user_role, user_id, user_name, user_email",
      [userRole, userId]
    );
    res.json({ ...updatedUser.rows[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
