const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { validators, validationHandler } = require('../middlewares/login/validators');
const { redirectLoggedIn } = require('../middlewares/common/checkLogin');

const page_title = 'Login'

router.get('/',
    decorateHtmlResponse(page_title),
    redirectLoggedIn,
    loginController.getLogin
);

router.post('/',
    validators,
    validationHandler,
    loginController.login
);

router.delete('/logout',
    loginController.logout
);

module.exports = router;
