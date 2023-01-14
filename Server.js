const App = require("./initilize")
const connectDB = require("./Config/db")


connectDB()
const Port = process.env.PORT


App.listen(Port,()=>{
    console.log(`Server is Up`)
})