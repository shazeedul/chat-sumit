const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require("../middlewares/user/avatarUpload");
const { validators, validationHandler } = require("../middlewares/user/validators");
const { checkLogin } = require("../middlewares/common/checkLogin");

const page_title = 'User'

router.get("/", decorateHtmlResponse(page_title), checkLogin, userController.getUsers);

router.post("/", checkLogin, avatarUpload, validators, validationHandler, userController.createUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
