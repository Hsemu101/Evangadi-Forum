const express = require("express")
const authMiddleware = require("../middleware/autentication")

const { getAllQuestions, getSingleQuestion, postQuestion } = require("../Controller/questionController")

const router = express.Router();

// Get all questions
router.get("/question",authMiddleware, getAllQuestions);


// Get single question by ID
router.get("/question/:question_id", authMiddleware, getSingleQuestion);
module.exports = router;



// Post a new question
router.post("/question", authMiddleware, postQuestion);