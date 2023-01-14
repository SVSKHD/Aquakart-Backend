const AquaUsers = require("../CommonUsers/userModel");
const toNext = require("../middlewares/toNext");
const CustomError = require("../utils/CustomError");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = toNext(async (req, res, next) => {
  const token =
    req.cookies.AquaUser || req.header("Authorization").replace("Bearer", "");
  if (!token) {
    return next(new CustomError("Login to get access to this page"));
  }
  const decoded = jwt.verify(token, process.env.JWTSECRET);
  req.user = await AquaUsers.findById(decoded.id);
  next();
});

exports.customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError("You are not allowerd", 403));
    }
    next();
  };
};
