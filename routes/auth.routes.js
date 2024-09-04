const express = require("express");
const authCtrl = require("../controller/auth.controller");
const router = express.Router();
router.route("/auth/signIn").post(authCtrl.signIn);
router.route("/auth/signOut").get(authCtrl.signOut);
module.exports = router;
