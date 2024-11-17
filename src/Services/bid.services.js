const bidDao = require("../Dao/bid.dao");
const userDao = require("../Dao/user.dao");

module.exports = class BidServices {
    constructor() {
        this.bidDao = new bidDao();
        this.userDao = new userDao();
        // this.conversationDao=new conve
    }

    async createBid(mentorId, bidId, data) {
        console.log("Creating bid...");

        const newBid = await this.bidDao.createBid({
            mentorId,
            bidId,
            ...data
        });

        return {
            message: "Bid created successfully",
            bid: newBid,
        };
    }

    async getBidById(id) {
        const bid = await this.bidDao.getBidById(id);
        if (!bid) {
            throw new Error("Bid not found");
        }
        return bid;
    }

    async getAllBids() {
        return this.bidDao.getAllBids();
    }

    async updateBidStatus(id, data) {
        const updatedBid = await this.bidDao.updateBid(id, data);
        if (!updatedBid) {
            throw new Error("Bid not found");
        }

        return updatedBid;
    }

    async deleteBid(id) {
        const deletedBid = await this.bidDao.deleteBid(id);
        if (!deletedBid) {
            throw new Error("Bid not found");
        }
        return {
            message: 'Bid deleted successfully'
        };
    }

    async getBidsByMentorId(mentorId) {
        const bids = await this.bidDao.getBidsByMentorId(mentorId);
        if (!bids) {
            throw new Error("No bids found for this mentor");
        }
        return bids;
    }
    async getBidsByMenteeId(menteeId) {
        const bids = await this.bidDao.getBidsByMenteeId(menteeId);
        if (!bids) {
            throw new Error("No bids found for this mentee");
        }
        return bids;
    }
    async getBidsByListingId(listingId) {
        return this.bidDao.getBidsByListingId(listingId);
    }

    async getBidsByBidId(bidId) {
        return this.bidDao.getBidsByBidId(bidId);
    }

    async getBidByMentorAndBid(mentorId, bidId) {
        const bid = await this.bidDao.getBidByMentorAndBid(mentorId, bidId);
        if (!bid) {
            throw new Error("Bid not found for this mentor");
        }
        return bid;
    }

    async updateMeetId(id, meetId) {
        const updatedBid = await this.bidDao.updateMeetId(id, meetId);
        if (!updatedBid) {
            throw new Error("Bid not found");
        }
        return updatedBid;
    }

    async getBidsByTopic(topic) {
        const bids = await this.bidDao.getBidsByTopic(topic);
        if (!bids) {
            throw new Error("No bids found for this topic");
        }
        return bids;
    }

    async getBidDetails(id) {
        const bidDetails = await this.bidDao.getBidDetails(id);
        if (!bidDetails) {
            throw new Error("Bid details not found");
        }
        return bidDetails;
    }
};
