const User = require("../models/User");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

function getLogin(req, res, next)
{
    res.render('index');
}

async function login(req, res, next)
{
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [
                { email: username },
                { mobile: username },
            ],
        });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                const userObject = {
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: "user",
                };

                const accessToken = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                res.cookie(process.env.COOKIE_NAME, accessToken, {
                    httpOnly: true,
                    maxAge: process.env.JWT_EXPIRY,
                    signed: true,
                });

                res.locals.loggedInUser = userObject;

                res.render('inbox');
            } else {
                throw createHttpError("Login failed! Please try again later.");
            }
        } else {
            throw createHttpError("Login failed! Please try again later.");
        }
    } catch (error) {
        res.render('index', {
            data: {
                username,
            },
            errors: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
}

function logout(req, res, next)
{
    res.clearCookie(process.env.COOKIE_NAME);
}

module.exports = {
    getLogin,
    login,
    logout,
}