const express = require("express");
const QuizController = require("../Controller/quiz.controller");

const router = express.Router();
const quizController = new QuizController();

router.post("/create", quizController.createQuiz);
router.get("/:quizId", quizController.getQuizById);
router.get("/", quizController.getAllQuizzes);
router.put("/:quizId", quizController.updateQuiz);
router.delete("/:quizId", quizController.deleteQuiz);


router.post("/attempt/:quizId/student/:studentId", quizController.attemptQuiz);


router.post("/review/:quizId/student/:studentId", quizController.addStudentMarks);

module.exports = router;
