const express = require("express")
const bodyParser  = require("body-parser")
const cookieParser = require("cookie-parser")
const Morgan = require("morgan")
require('dotenv').config()

const App = express()

//middlewares
App.use(bodyParser.json())
App.use(cookieParser())
App.use(Morgan('dev'))




module.exports = App




