const express = require("express")
const Server = express.Router()
const {createInvoice} = require("../controllers/AquaInvoice")
Server.get("/test",(req,res)=>{
    res.json({
        "Hello Server" : "Server crm Restest"
    })
})


Server.post("/invoice-create" , createInvoice)


module.exports = Server