const express = require("express");
const UserRouter = express.Router();
const { Login, Signup } = require("../controller/User.controller");

// Routes for user authentication
UserRouter.get("/", (req, res) => {
  res.send("Welcome to auth");
});
UserRouter.post("/signup", Signup);
UserRouter.post("/login", Login);

module.exports = UserRouter;
