const Express = require("express");
const app = Express();




//user route middleware  
const userRoutes = require("./routes/userRoute")
const MyDataBaseConnection = require("./db/db.config")

app.use(Express.json())
app.use("/api/users/",  userRoutes)

///question route middle ware







// answer route muddleware




async function Testdb(){
    try {
        // const result = await MyDataBaseConnection.execute("SELECT 'test' ") 
        app.listen(5500)
        console.log("DB connection is established")
        console.log("Listneing on port 5500")
        // console.log(result)
     } catch (error) {
         console.log(error.message)
     }
}
Testdb()