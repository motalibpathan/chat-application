// external exports
const express = require("express");
const { getLogin, login, logout } = require("../controller/loginController");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");

const router = express.Router();

// set page title
const page_title = "Login";

router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

router.delete("/", logout);

module.exports = router;
