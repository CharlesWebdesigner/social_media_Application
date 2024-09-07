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

router
  .route("/api/posts/new/:userId")
  .post(authCtrl.requireSignIn, postCtrl.create);
router
  .route("/api/posts/:postId")
  .delete(authCtrl.requireSignIn, postCtrl.isPoster, postCtrl.remove);
router.route("/api/posts/like").put(authCtrl.requireSignIn, postCtrl.like);
router.route("/api/posts/unlike").put(authCtrl.requireSignIn, postCtrl.unlike);
router
  .route("/api/posts/comment")
  .put(authCtrl.requireSignIn, postCtrl.comment);
router
  .route("/api/posts/uncomment")
  .put(authCtrl.requireSignIn, postCtrl.uncomment);

router.param("userId", useCtrl.userByID);
router.param("postId", postCtrl.postByID);
// router.param("postId", (req, res, next, id) => {
//   console.log("router.param userId:", id);
//   useCtrl.postByID(req, res, next, id);
//   next();
// });
module.exports = router;
