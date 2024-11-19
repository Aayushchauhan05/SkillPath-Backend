const statusConstant = require("../constant/status.constant");
const BidServices = require("../Services/bid.services");

module.exports = class BidController {
    constructor() {
        this.bidService = new BidServices();
    }

    // Create a new bid
    createBid = async (request, response) => {
        console.log("Controller->bid.controller.js->createBid");

        try {
            const { mentorId, bidId } = request.query;
            console.log({ mentorId, bidId });

            const eventData = request.body;
            const data = await this.bidService.createBid(mentorId, bidId, eventData);
            console.log(data);
            response.status(statusConstant.created).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "mentor not found") {
                response.status(statusConstant.notFound).send({ message: "mentor not found" });
            } else if (error.message === "bid not found") {
                response.status(statusConstant.notFound).send({ message: "bid not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Get all bids by mentor ID
    getBidsByMentor = async (request, response) => {
        console.log("Controller->bid.controller.js->getBidsByMentor");

        try {
            const { mentor_id } = request.params;
            const data = await this.bidService.getBidsByMentorId(mentor_id);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "No bids found for this mentor") {
                response.status(statusConstant.notFound).send({ message: "No bids found for this mentor" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }
    getBidsByListing = async (request, response) => {
        console.log("Controller->bid.controller.js->getBidsByListing");

        try {
            const { listing_id } = request.params;
            const data = await this.bidService.getBidsByListingId(listing_id);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "No bids found for this listing_id") {
                response.status(statusConstant.notFound).send({ message: "No bids found for this listing_id" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }
    getBidsByMentee = async (request, response) => {
        console.log("Controller->bid.controller.js->getBidsByMentee");

        try {
            const {mentee_id } = request.params;
            console.log("hi>>>>>",mentee_id);
            const data = await this.bidService.getBidsByMenteeId(mentee_id);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "No bids found for this mentee") {
                response.status(statusConstant.notFound).send({ message: "No bids found for this mentee" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Get bid details by ID
    getBidById = async (request, response) => {
        console.log("Controller->bid.controller.js->getBidById");

        try {
            const { id } = request.params;
            const data = await this.bidService.getBidById(id);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "Bid not found") {
                response.status(statusConstant.notFound).send({ message: "Bid not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Update bid details
    updateBidStatus = async (request, response) => {
        console.log("Controller->bid.controller.js->updateBid");

        try {
            const { bidId } = request.params;
            const data = request.body;
            const updatedBid = await this.bidService.updateBidStatus(bidId, data);
            console.log(updatedBid);
            response.status(statusConstant.success).send(updatedBid);
        } catch (error) {
            console.log(error);
            if (error.message === "Bid not found") {
                response.status(statusConstant.notFound).send({ message: "Bid not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Delete a bid
    deleteBid = async (request, response) => {
        console.log("Controller->bid.controller.js->deleteBid");

        try {
            const { id } = request.params;
            const data = await this.bidService.deleteBid(id);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "Bid not found") {
                response.status(statusConstant.notFound).send({ message: "Bid not found" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }

    // Get bids by topic
    getBidsByTopic = async (request, response) => {
        console.log("Controller->bid.controller.js->getBidsByTopic");

        try {
            const { topic } = request.params;
            const data = await this.bidService.getBidsByTopic(topic);
            console.log(data);
            response.status(statusConstant.success).send(data);
        } catch (error) {
            console.log(error);
            if (error.message === "No bids found for this topic") {
                response.status(statusConstant.notFound).send({ message: "No bids found for this topic" });
            } else {
                response.status(statusConstant.serverError).send({ message: "Internal server error" });
            }
        }
    }
};
