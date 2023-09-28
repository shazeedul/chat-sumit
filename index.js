const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const { notFoundHandle, errorHandle } = require("./middlewares/common/errorHandle");
const loginRouter = require("./routers/loginRouter");
const userRouter = require("./routers/userRouter");
const inboxRouter = require("./routers/inboxRouter");
const moment = require("moment");
const http = require("http");

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = require("socket.io")(server);
global.io = io;

// set comment as app locals
app.locals.moment = moment;

// Connect to DB
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Request params
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Set view engine
app.set("view engine", "ejs");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use('/', loginRouter)
app.use('/users', userRouter)
app.use('/inbox', inboxRouter)

// 404 not found handler
app.use(notFoundHandle)

// Error Handle
app.use(errorHandle)

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
