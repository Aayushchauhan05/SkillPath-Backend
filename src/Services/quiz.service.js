const QuizDao = require("../Dao/quiz.dao");
const User = require("../Entities/user.entities"); 
module.exports = class QuizService {
  constructor() {
    this.quizDao = new QuizDao();
  }

  async createQuiz(data) {
    return await this.quizDao.createQuiz(data);
  }

  async getQuizById(quizId) {
    const quiz = await this.quizDao.getQuizById(quizId);
    if (!quiz) throw new Error("Quiz not found");
    return quiz;
  }

  async getAllQuizzes() {
    return await this.quizDao.getAllQuizzes();
  }

  async updateQuiz(quizId, update) {
    const quiz = await this.quizDao.updateQuiz(quizId, update);
    if (!quiz) throw new Error("Quiz not found");
    return quiz;
  }

  async deleteQuiz(quizId) {
    const quiz = await this.quizDao.deleteQuiz(quizId);
    if (!quiz) throw new Error("Quiz not found");
    return quiz;
  }

  async addStudentMarks(quizId, studentId, marks, checkedBy) {
    const quiz = await this.quizDao.addStudentMarks(quizId, marks, checkedBy);
    if (!quiz) throw new Error("Quiz not found");

    const student = await User.findById(studentId);
    if (!student) throw new Error("Student not found");
    student.quiz = quizId;
    await student.save();

    return quiz;
  }

  async attemptQuiz(quizId, studentId) {
    const quiz = await this.quizDao.getQuizById(quizId);
    if (!quiz) throw new Error("Quiz not found");

    const student = await User.findById(studentId);
    if (!student) throw new Error("Student not found");

    student.quiz = quizId;
    await student.save();

    return quiz;
  }
};
