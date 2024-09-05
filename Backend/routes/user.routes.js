const express = require("express");
const useCtrl = require("../controller/user.controller");
const authCtrl = require("../controller/auth.controller");
const router = express.Router();
router.route("/api/users").get(useCtrl.list).post(useCtrl.create);
router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignIn, useCtrl.read)
  .put(authCtrl.requireSignIn, authCtrl.hasAuthorization, useCtrl.update)
  .delete(authCtrl.requireSignIn, authCtrl.hasAuthorization, useCtrl.remove);
//photo api
router
  .route("/api/users/photo/:userId")
  .get(useCtrl.photo, useCtrl.defaultPhoto);
router.route("/api/users/defaultphoto").get(useCtrl.defaultPhoto);
//follow and follower api
router
  .route("/api/users/follow")
  .put(authCtrl.requireSignIn, useCtrl.addFollowing, useCtrl.addFollower);
router
  .route("/api/users/unfollow")
  .put(authCtrl.requireSignIn, useCtrl.removeFollowing, useCtrl.removeFollower);
//notFollowed users
router
  .route("/api/findpeople/:userId")
  .get(authCtrl.requireSignIn, useCtrl.findpeople);
router.param("userId", useCtrl.userByID);
module.exports = router;
