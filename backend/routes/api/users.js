const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { isProduction } = require("../../config/keys");
const { loginUser, restoreUser } = require("../../config/passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

/* GET /api/users */
router.get("/", (_req, res, _next) => {
  res.json({ message: "GET /users" });
});

/* POST /api/users/register */
router.post("/register", validateRegisterInput, async (req, res, next) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (user) {
    const error = new Error("Validation Error");
    error.statusCode = 400;
    const errors = {};
    if (user.email === email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === username) {
      errors.username = "A user has already registered with this username";
    }
    error.errors = errors;
    return next(error);
  }

  const newUser = new User({ username, email });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

/* POST /api/users/login */
router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      error.errors = { email: "Invalid credentials" };
      return next(error);
    }
    return res.json(loginUser(user));
  })(req, res, next);
});

/* GET /api/users/current */
router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = router;
