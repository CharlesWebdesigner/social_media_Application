const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("../routes/auth.routes");
const userRoutes = require("../routes/user.routes");
// const compress = require("compress");
const cors = require("cors");
// app.use(compress());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/", authRoutes);
app.use("/", userRoutes);
// app.use(cors({ origin: "localhost" }));
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + " :" + err.message });
  } else if (err) {
    res.status(400).json({ error: error.name + " :" + err.message });
  }
});
module.exports = app;
