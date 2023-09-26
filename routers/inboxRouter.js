const express = require("express");
const router = express.Router();
const inboxController = require("../controllers/inboxController");

router.get("/", inboxController.getInbox);

module.exports = router;
