const express = require("express");
const router = express.Router();
const inboxController = require("../controllers/inboxController");
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

router.get("/", decorateHtmlResponse('Index'), inboxController.getInbox);

module.exports = router;
