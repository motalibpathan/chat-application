// external exports
const express = require("express");
const {
  getInbox,
  searchUser,
  getMessages,
  addConversation,
  sendMessage,
} = require("../controller/inboxController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const attachmentUpload = require("../middlewares/inbox/attachmentUpload");

const router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

router.post("/search", checkLogin, searchUser);

router.post("/conversation", checkLogin, addConversation);

router.get("/messages/:conversation_id", checkLogin, getMessages);

router.post("/message", checkLogin, attachmentUpload, sendMessage);

module.exports = router;
