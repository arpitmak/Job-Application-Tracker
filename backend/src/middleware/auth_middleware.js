
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized. No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { userId: decoded.userId };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
};

module.exports = protect;
