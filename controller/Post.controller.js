const PostModel = require("../models/Post.model");

//  Get all  post
const getAllPost = async (req, res, next) => {
  const posts = await PostModel.find()
  res.status(200).json(posts);
};

const getpostById = async (req, res, next) => {
  const post = await PostModel.findById(req.params.id)
  res.status(200).json(post);
};

//  Create Post
const createPost = async (req, res, next) => {
  const { name, email } = req.body;
  const newPost = new PostModel({
    name,
    email,
  });
  await newPost.save();
  res.status(200).json({ message: "New post created successfully" });
};

// Delete Post
const deletePost = async (req, res, next) => {
  const id = req.params.id;
  const post = await PostModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Post deleted successfully" });
};


// Edit Post
const editPost = async (req, res, next) => {
  const id = req.params.id;

  const post = await PostModel.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Post Update successfully" });
};

module.exports = { getAllPost, createPost, deletePost, editPost, getpostById };
