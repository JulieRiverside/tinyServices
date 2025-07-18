//server/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require("../models/User");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: "Not authorized" })
  }
  
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" })
    req.userId= decoded.id;
    next()
  })
}

module.exports = auth;
