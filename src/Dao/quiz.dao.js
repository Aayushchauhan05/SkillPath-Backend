const Quiz = require("../Entities/quiz.entities");

module.exports = class QuizDao {
  model = Quiz;

  async createQuiz(data) {
    return this.model.create(data);
  }

  async getQuizById(quizId) {
    return this.model.findById(quizId);
  }

  async getAllQuizzes() {
    return this.model.find();
  }

  async updateQuiz(quizId, update) {
    return this.model.findByIdAndUpdate(quizId, { ...update }, { new: true });
  }

  async deleteQuiz(quizId) {
    return this.model.findByIdAndDelete(quizId);
  }

  async addStudentMarks(quizId, marks, checkedBy) {
    return this.model.findByIdAndUpdate(
      quizId,
      { marksObtained: marks, checkedBy },
      { new: true }
    );
  }
};
