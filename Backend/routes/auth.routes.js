const express = require("express");
const authCtrl = require("../controller/auth.controller");
const router = express.Router();
router.route("/auth/signin").post(authCtrl.signIn);
router.route("/auth/signout").get(authCtrl.signOut);
module.exports = router;
