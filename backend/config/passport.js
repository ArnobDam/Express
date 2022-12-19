const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { secretOrKey } = require("./keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      session: false,
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      const user = await User.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
          if (err || !isMatch) {
            done(null, false);
          } else {
            done(null, user);
          }
        });
      } else {
        done(null, false);
      }
    }
  )
);

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      done(error);
    }
  })
);

exports.loginUser = function (user) {
  const userInfo = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(userInfo, secretOrKey, { expiresIn: 3600 });
  return {
    user: userInfo,
    token,
  };
};

exports.requireUser = passport.authenticate("jwt", { session: false });

exports.restoreUser = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, function (err, user) {
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
};
