const { alreadyExist, created, serverError, notFound, unAuthorised, success } = require("../constant/status.constant.js");
const UserService = require("../Services/user.service");

module.exports = class UserController {
    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req, res) => {
        try {
            console.log("controller->user.controller->createUser");
            const data = await this.userService.createUserService(req.body);
            return res.status(created).send(data);
        } catch (error) {
            console.log(error, "error in createUser");
            if (error.message === "User Already Exists") {
                return res.status(alreadyExist).send({ message: "User already exists" });
            }
            if(error.errmsg.includes("E11000 duplicate key error collection: test.users index: username_1 dup key")) {
                return res.status(alreadyExist).send({ message: "UserName already exists" });
            }
            
            return res.status(serverError).send({ message: "Internal server error" });
        }
    }

    loginUser = async (req, res) => {
        try {
            console.log("controller->user.controller->loginUser");
            const data = await this.userService.userLoginService(req.body);
            return res.status(success).send(data);
        } catch (error) {
            if (error.message === "User Not Found") {
                return res.status(notFound).send({ message: "User not found" });
            } else if (error.message === "Incorrect Password") {
                return res.status(unAuthorised).send({ message: "Wrong Password" });
            }
            return res.status(serverError).send({ message: "Internal server error" });
        }
    }

    findUserById = async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await this.userService.findUserByIdService(userId);
            return res.status(success).send(user);
        } catch (error) {
            if (error.message === "User Not Found") {
                return res.status(notFound).send({ message: "User not found" });
            }
            return res.status(serverError).send({ message: "Internal server error" });
        }
    }

    updateUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = await this.userService.updateUserService(userId, req.body);
            return res.status(success).send(updatedUser);
        } catch (error) {
            if (error.message === "User Not Found") {
                return res.status(notFound).send({ message: "User not found" });
            }
            return res.status(serverError).send({ message: "Internal server error" });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await this.userService.deleteUserService(userId);
            return res.status(success).send({ message: "User deleted successfully", data: deletedUser });
        } catch (error) {
            if (error.message === "User Not Found") {
                return res.status(notFound).send({ message: "User not found" });
            }
            return res.status(serverError).send({ message: "Internal server error" });
        }
    }

    findAllUsers = async (req, res) => {
        try {
            const users = await this.userService.findAllUsersService();
            return res.status(success).send(users);
        } catch (error) {
            return res.status(serverError).send({ message: "Internal server error" });
        }
    }

    addEducation = async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = await this.userService.addEducationService(userId, req.body);
            return res.status(success).send(updatedUser);
        } catch (error) {
            if (error.message === "User Not Found") {
                return res.status(notFound).send({ message: "User not found" });
            }
            return res.status(serverError).send({ message: "Internal server error" });
        }
    }

    addExperience = async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = await this.userService.addExperienceService(userId, req.body);
            return res.status(success).send(updatedUser);
        } catch (error) {
            if (error.message === "User Not Found") {
                return res.status(notFound).send({ message: "User not found" });
            }
            return res.status(serverError).send({ message: "Internal server error" });
        }
    }
}
