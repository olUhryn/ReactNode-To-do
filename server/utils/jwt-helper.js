import jwt from "jsonwebtoken";

export default {
  jwtTokens({ user_id, user_name, user_email, user_role }) {
    const user = { user_id, user_name, user_email, user_role };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  },
  setRefreshToken(res, user) {
    let tokens = jwtTokens(user);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
    });
    delete tokens.refreshToken;
    return tokens;
  },
  verifyJwt(res, refreshToken) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) {
          return res.status(403).json({ error: error.message });
        } else {
          let token = setRefreshToken(res, users.rows[0]);
          res.json(token);
        }
      }
    );
  },
};
