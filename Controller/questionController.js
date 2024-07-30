const MyDataBaseConnection = require("../db/db.config");
const { StatusCodes } = require("http-status-codes");

async function getAllQuestions(req, res) {
    try {
        const [questions] = await MyDataBaseConnection.query(
            "SELECT q.questionid, q.title, q.description, q.tag, u.username FROM questions q JOIN users u ON q.userid = u.userid"
        );
        
        if (questions.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "No questions found" });
        }

        return res.status(StatusCodes.OK).json({ questions });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred while retrieving questions" });
    }
}

async function getSingleQuestion(req, res) {
    const { question_id } = req.params;

    try {
        const [question] = await MyDataBaseConnection.query(
            "SELECT q.questionid, q.title, q.description, q.tag, u.username FROM questions q JOIN users u ON q.userid = u.userid WHERE q.questionid = ?",
            [question_id]
        );
        
        if (question.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
        }

        return res.status(StatusCodes.OK).json({ question: question[0] });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred while retrieving the question" });
    }
}

async function postQuestion(req, res) {
    const { title, description, tag } = req.body;
    const userid = req.user.userid; // Assuming the user is authenticated and userid is in req.user

    if (!title || !description) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Title and description are required" });
    }

    try {
        const questionid = `question-${Date.now()}`; // Generating a unique question ID
        await MyDataBaseConnection.query(
            "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
            [questionid, userid, title, description, tag]
        );

        return res.status(StatusCodes.CREATED).json({ msg: "Question created successfully", questionid });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred while creating the question" });
    }
}



module.exports = { getAllQuestions, getSingleQuestion, postQuestion };
