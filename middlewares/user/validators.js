const { check, validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const User = require('../../models/User');

const validators = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (inputEmail) => {
            try {
                const user = await User.findOne({ email: inputEmail });
                if (user) {
                    throw createHttpError('Email already in use');
                }
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
    check('mobile')
        .isMobilePhone('bn-BD', {
            strictMode: true,
        })
        .withMessage('Mobile number must be a valid Bangladeshi mobile number')
        .custom(async (inputMobile) => {
            try {
                const user = await User.findOne({ mobile: inputMobile });
                if (user) {
                    throw createHttpError('Mobile number already in use');
                }
            } catch (error) {
                throw createHttpError(error.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage(
            'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
        ),
];

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        //remove uploaded files
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                (err) => {
                    console.log(err);
                }
            );
        }

        res.status(500).json({
            errors: mappedErrors,
        });
    }
};

module.exports = {
    validators,
    validationHandler,
};