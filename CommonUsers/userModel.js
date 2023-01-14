const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [40, "Name Should be under 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email"],
    validate: [validator.isEmail, "Please enter valid email"],
    unique: true,
  },
  gender: {
    type: String,
  },
  addressType: {
    type: String,
    maxlength: [10, "Please fill the address type below 10 caharacters"],
  },
  address: {
    type: Array,
  },
  password: {
    type: String,
    required: [true, "Please Provide Your Email"],
    minlength: [6, "Password should be atleast 6 characters"],
    select: false,
  },
  phone: {
    type: Number,
    maxlength: [10, "Phone no must be at least 10 numbers"],
    select: false,
  },
  role: {
    type: String,
    default: "Customer",
  },
  photo: {
    id: {
      type: String,
    },
    secured_url: {
      type: String,
    },
  },
  password: {
    type: String,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//save password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//validate password on user passage of password
userSchema.methods.validatePassword = async function (usersendPassword) {
  return await bcrypt.compare(usersendPassword, this.password);
};

//create and return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generate forgot password token
userSchema.methods.getForgotPasswordToken = function () {
  const forgotToken = crypto.randomBytes(20).toString("hex");
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
  return forgotToken;
};

module.exports = mongoose.model("AquaUsers", userSchema);
