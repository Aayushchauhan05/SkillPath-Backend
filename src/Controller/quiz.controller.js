const QuizService = require("../Services/quiz.service");
const { created, success, notFound, serverError } = require("../constant/status.constant");

module.exports = class QuizController {
  constructor() {
    this.quizService = new QuizService();
  }

  // Create a quiz
  createQuiz = async (req, res) => {
    try {
      const data = req.body;
      const quiz = await this.quizService.createQuiz(data);
      return res.status(created).send(quiz);
    } catch (error) {
      console.log("Error in creating quiz:", error);
      return res.status(serverError).send({ message: "Internal server error" });
    }
  };

  // Get a quiz by ID
  getQuizById = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await this.quizService.getQuizById(quizId);
      return res.status(success).send(quiz);
    } catch (error) {
      if (error.message === "Quiz not found") {
        return res.status(notFound).send({ message: error.message });
      }
      console.log("Error in fetching quiz:", error);
      return res.status(serverError).send({ message: "Internal server error" });
    }
  };

  // Get all quizzes
  getAllQuizzes = async (req, res) => {
    try {
      const quizzes = await this.quizService.getAllQuizzes();
      return res.status(success).send(quizzes);
    } catch (error) {
      console.log("Error in fetching quizzes:", error);
      return res.status(serverError).send({ message: "Internal server error" });
    }
  };

  // Update a quiz
  updateQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const update = req.body;
      const quiz = await this.quizService.updateQuiz(quizId, update);
      return res.status(success).send(quiz);
    } catch (error) {
      if (error.message === "Quiz not found") {
        return res.status(notFound).send({ message: error.message });
      }
      console.log("Error in updating quiz:", error);
      return res.status(serverError).send({ message: "Internal server error" });
    }
  };

  // Delete a quiz
  deleteQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      await this.quizService.deleteQuiz(quizId);
      return res.status(success).send({ message: "Quiz deleted successfully" });
    } catch (error) {
      if (error.message === "Quiz not found") {
        return res.status(notFound).send({ message: error.message });
      }
      console.log("Error in deleting quiz:", error);
      return res.status(serverError).send({ message: "Internal server error" });
    }
  };


  attemptQuiz = async (req, res) => {
    try {
      const { quizId, studentId } = req.params;
      const quiz = await this.quizService.attemptQuiz(quizId, studentId);
      return res.status(success).send(quiz);
    } catch (error) {
      if (error.message === "Quiz not found" || error.message === "Student not found") {
        return res.status(notFound).send({ message: error.message });
      }
      console.log("Error in attempting quiz:", error);
      return res.status(serverError).send({ message: "Internal server error" });
    }
  };


  addStudentMarks = async (req, res) => {
    try {
      const { quizId, studentId } = req.params;
      const { marks, checkedBy } = req.body;
      const quiz = await this.quizService.addStudentMarks(quizId, studentId, marks, checkedBy);
      return res.status(success).send(quiz);
    } catch (error) {
      if (error.message === "Quiz not found" || error.message === "Student not found") {
        return res.status(notFound).send({ message: error.message });
      }
      console.log("Error in adding student marks:", error);
      return res.status(serverError).send({ message: "Internal server error" });
    }
  };
};
