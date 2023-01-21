const express = require("express")
const Server = express.Router()
const {getInvoices} = require("../previousInvoices")

Server.get("/invoices" , getInvoices)

module.exports = Server