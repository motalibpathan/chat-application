const bcrypt = require("bcrypt");
const User = require("../models/People");
const fs = require("fs");
const path = require("path");

async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    console.log(users);
    res.locals.users = users;
    res.render("users", users);
  } catch (error) {
    next(error);
  }
}

async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    const result = await newUser.save();
    console.log(result);
    res.status(200).json({
      message: "User was added successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
  res.render("users");
}

async function removeUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });

    if (user.avatar) {
      fs.unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      common: {
        msg: "Could not delete the user",
      },
    });
  }
}

module.exports = {
  getUsers,
  addUser,
  removeUser,
};
