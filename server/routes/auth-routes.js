import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt-helper.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (users.rows.length === 0) {
      return res.status(401).json({ error: "Email not found" });
    }
    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    } else {
      let tokens = jwtTokens(users.rows[0]);
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
      });
      delete tokens.refreshToken;
      return res.json(tokens);
    }
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

router.get("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      res.status(401).json({ error: "Null refresh token" });
    } else {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error) {
            return res.status(403).json({ error: error.message });
          } else {
            let tokens = jwtTokens(user);
            res.cookie("refresh_token", tokens.refreshToken, {
              httpOnly: true,
            });
            delete tokens.refreshToken;
            res.json(tokens);
          }
        }
      );
    }
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

router.delete("/refresh-token", async (req, res) => {
  try {
    res.clearCookie("refresh_token");
  } catch (e) {
    res.status(401).json({ error: e.message });
    return res.status(200).json({ message: "Refresh token deleted" });
  }
});

export default router;
