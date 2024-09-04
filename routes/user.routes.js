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
router.param("userId", useCtrl.userByID);
module.exports = router;
