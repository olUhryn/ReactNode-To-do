import jwt from "jsonwebtoken";

const jwtTokens = ({ user_id, user_name, user_email, user_role }) => {
  const user = { user_id, user_name, user_email, user_role };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};
const setRefreshToken = (res, user) => {
  let tokens = jwtTokens(user);
  res.cookie("refresh_token", tokens.refreshToken, {
    httpOnly: true,
  });
  delete tokens.refreshToken;
  return tokens;
};
const verifyJwt = (res, refreshToken) => {
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: error.message });
    } else {
      let token = setRefreshToken(res, user);
      res.json(token);
    }
  });
};

export { verifyJwt, setRefreshToken, jwtTokens };
