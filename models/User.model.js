//  Create a schema for users with email and password
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("Auth-user", UserSchema);

module.exports = UserModel;
