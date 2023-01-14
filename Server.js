const Server = require("./initilize")


const Port = process.env.PORT

Server.listen(Port,()=>{
    console.log(`Server is Up`)
})