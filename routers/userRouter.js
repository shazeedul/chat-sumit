const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require("../middlewares/user/avatarUpload");
const { validators, validationHandler } = require("../middlewares/user/validators");

router.get("/", decorateHtmlResponse('User'), userController.getUsers);

router.post("/", avatarUpload, validators, validationHandler, userController.createUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
