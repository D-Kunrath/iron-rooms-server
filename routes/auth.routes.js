const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!!user) {
      throw new Error("Username already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    await User.create({
      username,
      passwordHash,
    });
    res.status(201).json({ message: `Created user: ${username}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new Error("information missing");
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("wrong user or password");
    }
    const validation = bcrypt.compareSync(password, user.passwordHash);
    if (validation) {
      const payload = {
        id: user._id,
        username: user.username,
      };
      const token = jwt.sign(payload, process.env.SECRET_JWT, {
        expiresIn: "1day",
      });
      res.status(200).json({ user: payload, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Error trying to login", error });
  }
});

module.exports = router;
