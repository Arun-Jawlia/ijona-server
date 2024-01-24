

//  Create a schema for users with email and password
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

},{
  timestamps:true
});

const PostModel = mongoose.model("User-post", PostSchema);

module.exports = PostModel;
