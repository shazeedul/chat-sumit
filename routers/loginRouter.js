const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

router.get('/', decorateHtmlResponse('Login'), loginController.getLogin)
// router.post('/', loginController.postLogin)
// router.get('/logout', loginController.getLogout)

module.exports = router;
