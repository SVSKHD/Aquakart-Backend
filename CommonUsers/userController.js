const toNext = require("../middlewares/toNext")
const AquaUsers = require("./userModel")
const cookieToken = require("../utils/CookieToken")
const CustomError = require("../utils/CustomError")
exports.Signup = toNext(async (req, res, next) => {
    //{ this code for accepting the photo files
    // let result;
  
    // if(req.files){
    //   let file = req.files.photo
    //    result= await Cloudinary.v2.uploader.upload(file.tempFilePath,{
    //     folder:"users",
    //     width:150,
    //     crop:"scale"
    //   })
    // }
    //}
    const { email, password } = req.body;
    if (!email || !password) {
      return customError("Please Provide Email and password", 400);
    }
    const user = await AquaUsers.create({
      email,
      password,
      //activate this code for user profile
      // photo:{
      //   id:result.public_id,
      //   secure_url:result.secure_url
      // }
    });
    cookieToken(user, res);
  });

  exports.Login = toNext(async (req, res, next) => {
    const { email, password } = req.body;
  
    // check for presence of email and password
    if (!email || !password) {
      return next(new CustomError("please provide email and password", 400));
    }
  
    // get user from DB
    const user = await AquaUsers.findOne({ email }).select("+password");
  
    // if user not found in DB
    if (!user) {
      return next(
        new CustomError("Email or password does not match or exist", 400)
      );
    }
  
    // match the password
    const isPasswordCorrect = await user.validatePassword(password);
  
    //if password do not match
    if (!isPasswordCorrect) {
      return next(
        new CustomError("Email or password does not match or exist", 400)
      );
    }
  
    // if all goes good and we send the token
    cookieToken(user, res);
  });