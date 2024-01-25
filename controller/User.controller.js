const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../error");
require("dotenv").config();

const Signup = async (req, res, next) => {
  const checkUser = await UserModel.findOne({ email: req.body.email });

  try {
    if (!checkUser) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      const newUser = new UserModel({ ...req.body, password: hashed_password });
      await newUser.save();
    
      const { password, ...otherDetails } = newUser._doc;
      res.status(200).json({ otherDetails });
    } else {
      // res.send({ message: "Username is already registered" });
      next(createError(404, "Email is already registerd"));
    }
  } catch (err) {
    next(createError(404, "User Not Found!"));
    // next(err);
  }
};
const Login = async (req, res,next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(404, "User Not Found!"));
    } else {
      const user_password = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!user_password) {
        return next(createError(400, "Wrong Credentials"));
      } else {
        const access_token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        const { password, ...otherDetails } = user._doc;

     res.status(200).json({ otherDetails, access_token });
    }
  }
  } catch (err) {
    next(createError(404, "User Not Found!"));
  }
};

module.exports = { Login, Signup };
