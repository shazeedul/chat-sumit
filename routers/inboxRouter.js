const express = require("express");
const router = express.Router();
const inboxController = require("../controllers/inboxController");
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { checkLogin } = require("../middlewares/common/checkLogin");

const page_title = 'Inbox'

router.get("/", decorateHtmlResponse(page_title), checkLogin, inboxController.getInbox);

module.exports = router;
