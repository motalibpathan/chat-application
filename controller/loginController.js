const User = require("../models/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

async function getLogin(req, res, next) {
  res.render("index", {
    title: "Login - Chat application",
  });
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          userid: user._id,
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          avatar: user.avatar || null,
          role: user.role || "user",
        };
        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });
        res.locals.loggedInUser = userObject;
        res.redirect("inbox");
      } else {
        throw createHttpError("Login failed! Please try again!");
      }
    } else {
      throw createHttpError("Login failed! Please try again!");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

async function logout(req, res, next) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged out");
}

module.exports = {
  getLogin,
  login,
  logout,
};
