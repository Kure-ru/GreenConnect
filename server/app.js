const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require('./utils/middleware')

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const groupsRouter = require("./routes/groups");


const app = express();

// Connection to DB
logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use(express.static("build"));

// Routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/groups", groupsRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
