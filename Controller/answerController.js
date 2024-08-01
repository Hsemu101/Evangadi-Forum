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
            return res.status(404).json({ msg: "No answers found for this question" });
        }

        // Return the answers
        return res.status(404).json({ answers });
    } catch (error) {
        console.error(error.message);
        return res.status(404).json({ msg: "An error occurred while retrieving answers" });
    }
}



async function postAnswer(req, res) {
    const { questionid, answer } = req.body;
    const userid = req.user.userid; 

    if (!questionid || !answer) {
        return res.status(404).json({ msg: "Please provide a question ID and answer" });
    }

    try {
        const [question] = await MyDataBaseConnection.query("SELECT id FROM questions WHERE questionid = ?", [questionid]);
        console.log(question)
        
        if (question.length === 0) {
            return res.status(404).json({ msg: "Question not found" });
        }

        await MyDataBaseConnection.query(
            "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
            [userid, questionid, answer]
        );

        return res.status(404).json({ msg: "Answer posted successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ msg: "An error occurred while posting the answer" });
    }
}




module.exports = { getAnswersForQuestion, postAnswer };