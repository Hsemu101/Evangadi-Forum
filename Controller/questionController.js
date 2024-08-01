const MyDataBaseConnection = require("../db/db.config");


//GETTING EVERY QUESTION ON THE DATABASE
async function getAllQuestions(req, res) {
    try {
        const [questions] = await MyDataBaseConnection.query(
            "SELECT q.questionid, q.title, q.description, q.tag, u.username FROM questions q JOIN users u ON q.userid = u.userid"
        );
        
        if (questions.length === 0) {
            return res.status(401).json({ msg: "No questions found" });
        }

        return res.status(200).json({ questions });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ msg: "An error occurred while retrieving questions" });
    }
}


//FILTERS SINGLE QUESTION
async function getSingleQuestion(req, res) {
    const { question_id } = req.params;

    try {
        const [question] = await MyDataBaseConnection.query(
            "SELECT q.questionid, q.title, q.description, q.tag, u.username FROM questions q JOIN users u ON q.userid = u.userid WHERE q.questionid = ?",
            [question_id]
        );
       
        
        if (question.length === 0) {
            return res.status(404).json({ msg: "Question not found" });
        }

        return res.status(200).json({ question: question[0] });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ msg: "An error occurred while retrieving the question" });
    }
}


// TO POST A QUESTION 
async function postQuestion(req, res) {
    const { title, description, tag } = req.body;
    const userid = req.user.userid; 

    if (!title || !description) {
        return res.status(404).json({ msg: "Title and description are required" });
    }

    try {
        const questionid = `question-${Date.now()}`; 
        await MyDataBaseConnection.query(
            "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
            [questionid, userid, title, description, tag]
        );

        return res.status(200).json({ msg: "Question created successfully", questionid });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ msg: "An error occurred while creating the question" });
    }
}



module.exports = { getAllQuestions, getSingleQuestion, postQuestion };
