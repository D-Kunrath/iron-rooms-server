const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).json({ message: "No token" });
  }

  const tokenWithoutBearer = token.split(" ")[0];

  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT);
    req.user = { ...decodedToken };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;