const MyDataBaseConnection = require("../db/db.config");
const { StatusCodes } = require("http-status-codes");

async function getAnswersForQuestion(req, res) {
    const { question_id } = req.params;
    try {
        // Query to get answers for the specified question
        const [answers] = await MyDataBaseConnection.query(
            "SELECT a.answerid, a.answer, u.username FROM answers a JOIN users u ON a.userid = u.userid WHERE a.questionid = ?",
            [question_id]
        );
        
        // Check if any answers are found
        if (answers.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "No answers found for this question" });
        }

        // Return the answers
        return res.status(StatusCodes.OK).json({ answers });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred while retrieving answers" });
    }
}



async function postAnswer(req, res) {
    const { questionid, answer } = req.body;
    const userid = req.user.userid; // Assuming auth middleware adds user to req

    if (!questionid || !answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide a question ID and answer" });
    }

    try {
        const [question] = await MyDataBaseConnection.query("SELECT id FROM questions WHERE questionid = ?", [questionid]);
        
        if (question.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
        }

        await MyDataBaseConnection.query(
            "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
            [userid, questionid, answer]
        );

        return res.status(StatusCodes.CREATED).json({ msg: "Answer posted successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "An error occurred while posting the answer" });
    }
}




module.exports = { getAnswersForQuestion, postAnswer };