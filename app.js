const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/common/middleware");

const port = process.env.PORT || 5001;

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {})
  .then(() => console.log("DB Connection successful"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Chat app listening on port ${port}`);
});
