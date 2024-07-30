// const authMiddleware = require("../middleware/autentication")
const authMiddleware = require("../middleware/autentication")
const { getAnswersForQuestion, postAnswer } = require("../Controller/answerController")
const express = require("express")

const router = express.Router()



// Answer route
router.get("/answer/:question_id", authMiddleware, getAnswersForQuestion);



// Post a new answer for a question
router.post("/answer", authMiddleware, postAnswer);




module.exports = router;