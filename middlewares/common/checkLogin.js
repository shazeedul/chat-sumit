const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
      }
      next();
    } catch (error) {
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "Authentication failed!",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(401).json({
        errors: {
          common: {
            msg: "Authentication failed!",
          },
        },
      });
    }
  }
};

const redirectLoggedIn = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (!cookies) {
    next();
  } else {
    res.redirect("/inbox");
  }
};

function requireRole(role) {
  return function (req, res, next) {
    if (req.user.role && role.includes(req.user.role)) {
      next();
    } else {
      if (res.locals.html) {
        next(createHttpError(401, "You are not authorized to access this page."));
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "You are not authorized to access this page.",
            },
          },
        });
      }
    }
  };
}

module.exports = {
  checkLogin,
  redirectLoggedIn,
  requireRole,
};
