
const jwt = require("jsonwebtoken")

async function authmiddleware(req, res, next){
    const authheader = req.headers.authorization
    if(!authheader){
        return res.status(401).json({error: "authentication invalid"})
    }

    try {
        
        const {username, userid} = jwt.verify(authheader, process.env.JWT_KEY)
        req.user = { username, userid}
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({msg: "Unauthorized user"})
    }

}

module.exports = authmiddleware


