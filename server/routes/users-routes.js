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
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [req.body.name, req.body.email, hashedPassword]
    );
    delete newUser.rows[0].user_password;
    res.json({ users: newUser.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
