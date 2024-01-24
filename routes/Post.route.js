const express = require("express");
const { authorized } = require("../middleware/auth");
const {
  createPost,
  deletePost,
  editPost,
  getAllPost,
} = require("../controller/Post.controller");

const PostRouter = express.Router();

// Routes for get all post, delete post, create post, edit post
PostRouter.get("/", getAllPost);
PostRouter.post("/create", createPost);
PostRouter.delete("/:id", deletePost);
PostRouter.put("/:id", editPost);

module.exports = PostRouter;
