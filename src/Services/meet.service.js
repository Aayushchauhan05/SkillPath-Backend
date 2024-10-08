const statusConstant = require("../constant/status.constant");
const MeetDao = require("../Dao/meet.dao");


module.exports = class MeetController {
    constructor() {
        this. meetDao = new MeetDao();
    }

    createMeet = async (request, response) => {
        console.log("Controller->meet.controller.js->createMeet");

        try {
            const { mentorId, menteeId } = request.query;
            console.log({ mentorId, menteeId });
            const data = await this. meetDao.createMeet(mentorId, menteeId, request.body);
            console.log(data);
            response.status(statusConstant.created).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "Mentor not found") {
                response.status(statusConstant.notFound).send({ message: "Mentor not found" });
            } else if (error.message === "Mentee not found") {
                response.status(statusConstant.notFound).send({ message: "Mentee not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    };

    getMeetById = async (request, response) => {
        const meetId = request.params.id;

        try {
            const meet = await this. meetDao.getMeetById(meetId);
            response.status(statusConstant.success).send(meet);
        } catch (error) {
            if (error.message === "Meeting not found") {
                response.status(statusConstant.notFound).send({ message: "Meeting not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    };

    getAllMeets = async (request, response) => {
        try {
            const meets = await this. meetDao.getAllMeets();
            response.status(statusConstant.success).send(meets);
        } catch (error) {
            response.status(statusConstant.serverError).send({ message: "Internal server error" });
        }
    };

    updateMeet = async (request, response) => {
        const meetId = request.params.id;

        try {
            const updatedMeet = await this. meetDao.updateMeet(meetId, request.body);
            response.status(statusConstant.success).send(updatedMeet);
        } catch (error) {
            if (error.message === "Meeting not found") {
                response.status(statusConstant.notFound).send({ message: "Meeting not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    };

    deleteMeet = async (request, response) => {
        const meetId = request.params.id;

        try {
            const deletedMeet = await this. meetDao.deleteMeet(meetId);
            response.status(statusConstant.success).send({ message: "Meeting deleted successfully", data: deletedMeet });
        } catch (error) {
            if (error.message === "Meeting not found") {
                response.status(statusConstant.notFound).send({ message: "Meeting not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    };

    getMeetsByMentorId = async (request, response) => {
        const mentorId = request.params.id;

        try {
            const meets = await this. meetDao.getMeetsByMentorId(mentorId);
            response.status(statusConstant.success).send(meets);
        } catch (error) {
            if (error.message === "Mentor not found") {
                response.status(statusConstant.notFound).send({ message: "Mentor not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    };

    getMeetsByMenteeId = async (request, response) => {
        const menteeId = request.params.id;

        try {
            const meets = await this. meetDao.getMeetsByMenteeId(menteeId);
            response.status(statusConstant.success).send(meets);
        } catch (error) {
            if (error.message === "Mentee not found") {
                response.status(statusConstant.notFound).send({ message: "Mentee not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    };

    getMeetByMentorAndMentee = async (request, response) => {
        const { mentorId, menteeId } = request.params;

        try {
            const meet = await this. meetDao.getMeetByMentorAndMentee(mentorId, menteeId);
            response.status(statusConstant.success).send(meet);
        } catch (error) {
            if (error.message === "Mentor not found" || error.message === "Mentee not found") {
                response.status(statusConstant.notFound).send({ message: error.message });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    };
};
