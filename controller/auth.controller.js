const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { expressjwt: JWT } = require("express-jwt");
const config = require("../config/config");
const signIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match" });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status("401").json({
      error: "could not sign in",
    });
  }
};
const signOut = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "signed out successfully" });
};
const requireSignIn = JWT({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "Access denied" });
    next();
  }
};
module.exports = {
  signIn,
  signOut,
  requireSignIn,
  hasAuthorization,
};
