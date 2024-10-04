const express = require("express");
const userController = require("../Controller/user.controller");
const { CREATE_USER, LOGIN_USER } = require("../constant/user.constant");

const router = express.Router();

const usercontroller = new userController();


router.post(CREATE_USER, usercontroller.createUser);


// Login routes
router.post(LOGIN_USER, usercontroller.loginUser);


module.exports = router;
