const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Signup = async (req, res, next) => {
  try {
    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (!checkUser) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      const newUser = new UserModel({
        email: req.body.email,
        password: hashed_password,
      });
      await newUser.save();

      const { password, ...userData } = newUser._doc;
      res.status(200).json({ userData });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Email is already registered" });
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

// ---------------------------------------------------------------------------
const Login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "User is not found" });
    } else {
      const user_password = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!user_password) {
        return res
          .status(400)
          .json({ status: 400, message: "Wrong Credentials" });
        // next(createError(400, "Wrong Credentials"));
      } else {
        const access_token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        const { password, ...userData } = user._doc;

        res.status(200).json({ userData, access_token });
      }
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: "User is not found" });
    // next(createError(404, "User Not Found!"));
  }
};

module.exports = { Login, Signup };
