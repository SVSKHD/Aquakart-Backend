const express = require("express")
const Server  = express.Router()
const {Signup , Login} = require("../userController")
const {isLoggedIn , customRole} = require("../../middlewares/user")


Server.post("/user-signup" , Signup)
Server.post("/user-login" , Login)




module.exports = Server