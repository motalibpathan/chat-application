const createHttpError = require("http-errors");

function notFoundHandler(req, res, next) {
  next(createHttpError(404, "Your requested content was not found!"));
}

function errorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);
  console.log(res.locals.html);
  if (res.locals.html) {
    res.render("error", {
      title: "Error page",
    });
  } else {
    res.json(res.locals);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
