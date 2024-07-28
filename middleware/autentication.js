
const jwt = require("jsonwebtoken")

async function authmiddleware(req, res, next){
    const authheader = req.headers.authorization
    if(!authheader){
        return res.status(401).json({error: "authentication invalid"})
    }

    try {
        // const Hello = jwt.verify(authheader, "select")
        const {username, userid} = jwt.verify(authheader, "select")
        req.user = { username, userid}
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({msg: "something went wrong"})
    }

}

module.exports = authmiddleware


