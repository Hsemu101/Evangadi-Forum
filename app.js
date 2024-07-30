
const Express = require("express");
const app = Express();
const https = require("https")
const fs = require("fs")
const path = require("path")
const cors = require('cors');



const privateKeyPath = path.join(__dirname, 'private-key-no-passphrase.pem');
const certificatePath = path.join(__dirname, 'certificate.pem');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');


const options = {
    key: privateKey,
    cert: certificate
  };



//user route middleware  
const userRoutes = require("./routes/userRoute") //userRoute
const answerRoutes = require("./routes/answerRoute"); //answerRoute
const questionRoutes = require("./routes/questionRoute"); // Question routes
const MyDataBaseConnection = require("./db/db.config")

app.use(Express.json());
app.use(cors());
app.use("/api/users/",  userRoutes) //user
app.use("/api", answerRoutes); //answer
app.use("/api", questionRoutes); //questionRoutes

///question route middle ware





// answer route middleware





async function Testdb(){
    try {
        // const result = await MyDataBaseConnection.execute("SELECT 'test' ") 
        https.createServer(options, app).listen(5500, () =>{
        console.log("DB connection is established")
        console.log("Listneing on port 5500")
        // console.log(result)
     })} catch (error) {
         console.log(error.message)
     }
}
Testdb()




