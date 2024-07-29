const MyDataBaseConnection = require("../db/db.config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authentication = require("../middleware/autentication")
const { StatusCodes } = require("http-status-codes")


async function register(req,res) {
    // res.send("register user")
    const {username, firstname, lastname, email, password} = req.body
   if(!username || !firstname || !lastname || !email || !password){
    return res.status(404).json({msg: "Please enter all necessary informations"})
   }
   try {
    const [user] = await MyDataBaseConnection.query("SELECT username, userid from users where username=? or email=?", [username,email])
    // return res.json({user: user})
    if(user.length > 0){
      return res.status(404).json({msg: "user already exists"})
    }
    if(password.length <= 8){
        return res.status(401).json({msg: "please enter a valid password"})
    }

    // encrypting the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)


    await MyDataBaseConnection.query("INSERT INTO USERS (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)", [username, firstname, lastname, email, hashPassword])
    return res.status(200).json({msg: "Table has been created"})
} catch (error) {
    
}
}

async function login (req,res){
    // res.send("login user")
    const {email, password} = req.body
    if(!email || !password){
    //    return res.status(400).json({msg: "NOT FOUND"})
    }
    try {

        const [user] = await MyDataBaseConnection.query("SELECT username, userid, password from users where email = ? ",[email])
        if(user.length === 0){
            res.status(404).json({msg: "Not Found"})
        }
       const Match = await bcrypt.compare(password, user[0].password)
        if(!Match){
            return res.status(404).json({msg: "Invalid username or password"})
        }

        const username = user[0].username
        const userid = user[0].userid
       const token = jwt.sign({username, userid }, process.env.JWT_KEY, {expiresIn: "1d"})
        return res.json({msg: "user login sucessful", token})


    } catch (error) {
        console.log(error.message)
        return res.status(400).json({msg: "something went wrong"})
    }

}

async function check(req, res){
    const username = req.user.username
    const userid = req.user.userid
    res.json({msg: "valid user", username, userid})

}

module.exports = {register, login, check}
