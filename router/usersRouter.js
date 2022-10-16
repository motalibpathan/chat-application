// external exports
const express = require("express");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidatorHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("Users"),
  checkLogin,
  requireRole(["admin"]),
  getUsers
);

router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidatorHandler,
  addUser
);

router.delete("/:id", removeUser);

module.exports = router;
