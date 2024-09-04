const router = require("express").Router();
const authCtrl = require("../controller/auth.controller");
const useCtrl = require("../controller/user.controller");
const postCtrl = require("../controller/post.controller");
router
  .route("/api/posts/feed/:userId")
  .get(authCtrl.requireSignIn, postCtrl.listNewsFeed);
//user posts
router
  .route("/api/posts/by/:userId")
  .get(authCtrl.requireSignIn, postCtrl.listByUser);
router.param("userId", useCtrl.userByID);
module.exports = router;
