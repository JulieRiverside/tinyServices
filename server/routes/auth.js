//routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const User = require("../models/User");  // You'll create this

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//register
router.post("/register", async (req, res) => {
  const { email, username, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send("Email already exists");

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hash,
      role, // Optional if your schema handles default
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "User created", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /api/auth/me
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // exclude password
    res.json(user);
  } catch (err) {
    res.status(500).json({ message:'Server Error'})
  }
});


module.exports = router;
