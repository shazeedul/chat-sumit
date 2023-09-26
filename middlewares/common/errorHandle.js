const createError = require("http-errors");

const notFoundHandle = (req, res, next) => {
  next(createError(404, "Not Found"));
};

const errorHandle = (err, req, res, next) => {
    res.locals.error = process.env.NODE_ENV == "development" ? err : { message: err.message }
    res.status(err.status || 500);

    if (res.locals.html) {
        res.render("error", {
            title: "Error"
        });
    } else {
        res.json(res.locals.error);
    }
};


module.exports = {
    notFoundHandle,
    errorHandle
};
    