const express = require("express")
const Server = express.Router()

Server.get("/test",(req,res)=>{
    res.json({
        "Hello Server" : "Server Restest"
    })
})


module.exports = Server