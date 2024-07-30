const express = require("express")
const {register, check, login} = require("../Controller/userController")

const authMiddleware = require("../middleware/autentication")


const router = express.Router()



router.post("/register", register)

//login user
router.post("/login", login)

// check user
router.get("/check", authMiddleware, check)





module.exports = router