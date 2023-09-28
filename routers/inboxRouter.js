const express = require("express");
const router = express.Router();
const inboxController = require("../controllers/inboxController");
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { checkLogin } = require("../middlewares/common/checkLogin");
const attachmentUpload = require("../middlewares/inbox/attachmentUpload");

const page_title = 'Inbox'

router.get('/',
    decorateHtmlResponse(page_title),
    checkLogin,
    inboxController.getInbox
);

router.post('/search',
    checkLogin,
    inboxController.searchUser
);

router.post('/conversation',
    checkLogin,
    inboxController.addConversation
);

router.get('/messages/:conversation_id',
    checkLogin,
    inboxController.getMessages
);

router.post('/message',
    checkLogin,
    attachmentUpload,
    inboxController.sendMessage
);

module.exports = router;
