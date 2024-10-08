const userDao = require("../Dao/user.dao.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class UserService {
  userdao = new userDao();

  async createUserService(userData) {
    const userExist = await this.userdao.findUserByEmail(userData.email);
    if (userExist) {
      throw new Error("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const data = await this.userdao.createUser({
      ...userData,
      password: hashedPassword,
    });

    if (!data) {
      throw new Error("User creation failed");
    }

    return data;
  }

  async userLoginService(userData) {
    const user = await this.userdao.findUserByEmail(userData.email);
    if (!user) {
      throw new Error("User Not Found");
    }

    const comparePass = await bcrypt.compare(userData.password, user.password);
    if (!comparePass) {
      throw new Error("Incorrect Password");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "secretkey", {
      expiresIn: "6d",
    });

    if (!token) {
      throw new Error("Failed to generate token");
    }

    return { ...user.toObject(), token };
  }

  async findUserByIdService(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await this.userdao.findUser(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    return user;
  }

  async updateUserService(userId, data) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await this.userdao.findUser(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    const updatedUser = await this.userdao.updateUser(userId, data);
    if (!updatedUser) {
      throw new Error("User update failed");
    }

    return updatedUser;
  }

  async deleteUserService(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await this.userdao.findUser(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    const deletedUser = await this.userdao.deleteUser(userId);
    if (!deletedUser) {
      throw new Error("User deletion failed");
    }

    return deletedUser;
  }

  async findAllUsersService() {
    const users = await this.userdao.findAllUsers();
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  }

  async createEducationService(userId, educationData) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await this.userdao.findUser(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    const updatedUser = await this.userdao.createEducation(userId, educationData);
    if (!updatedUser) {
      throw new Error("Failed to add education");
    }

    return updatedUser;
  }

  async addExperienceService(userId, experienceData) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await this.userdao.findUser(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    const updatedUser = await this.userdao.addExperience(userId, experienceData);
    if (!updatedUser) {
      throw new Error("Failed to add experience");
    }

    return updatedUser;
  }

  async addEducationService(userId, educationData) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await this.userdao.findUser(userId);
    if (!user) {
      throw new Error("User Not Found");
    }

    const updatedUser = await this.userdao.addEducation(userId, educationData);
    if (!updatedUser) {
      throw new Error("Failed to add education");
    }

    return updatedUser;
  }
};
