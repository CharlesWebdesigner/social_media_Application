const Post = require("../models/post.model");
const errorHandler = require("../helpers/dbErrorHandler");
const formidable = require("formidable");
const fs = require("fs");

const listNewsFeed = async (req, res) => {
  let following = req.profile.following;
  following.push(req.profile._id);
  try {
    let posts = await Post.find({ postedBy: { $in: req.profile.following } })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec();
    res.json(posts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const listByUser = async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.profile._id })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec();
    res.json(posts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    Object.keys(fields).forEach((key) => {
      if (Array.isArray(fields[key])) {
        fields[key] = fields[key][0];
      }
    });
    let post = new Post(fields);
    post.postedBy = req.profile;
    const photoFile = files.photo && files.photo[0];
    if (photoFile && photoFile.filepath) {
      console.log("Processing photo upload:", photoFile);
      try {
        post.photo.data = fs.readFileSync(photoFile.filepath);
        post.photo.contentType = photoFile.mimetype;
      } catch (readError) {
        // console.error("Error reading file:", readError);
        return res.status(400).json({
          error: "Could not read uploaded file",
        });
      }
    } else {
      console.log("No photo uploaded or invalid file.");
    }

    try {
      let result = await post.save();
      res.json(result);
    } catch (saveError) {
      console.error("Error saving post:", saveError);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(saveError),
      });
    }
  });
};

const remove = async (req, res) => {
  let post = req.post;
  try {
    let deletedPost = await Post.deleteOne();
    res.json(deletedPost);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};
const postByID = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id).populate("postedBy", "_id name").exec();
    if (!post) {
      return res.status(400).json({
        error: "Post not found",
      });
    }
    req.post = post;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "could not retrieve user post",
    });
  }
};
const isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!isPoster) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};
const like = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.body.userId } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const unlike = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const comment = async (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const uncomment = async (req, res) => {
  let comment = req.body.comment;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
module.exports = {
  listNewsFeed,
  listByUser,
  create,
  remove,
  photo,
  postByID,
  isPoster,
  like,
  unlike,
  comment,
  uncomment,
};
