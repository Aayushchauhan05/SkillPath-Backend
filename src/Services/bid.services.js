const bidDao = require("../Dao/bid.dao");
const ConversationDao = require("../Dao/conversation.dao");
const userDao = require("../Dao/user.dao");
const { updateMeetingStatus } = require("../utils/MeetingMail");

module.exports = class BidServices {
    constructor() {
        this.bidDao = new bidDao();
        this.userDao = new userDao();
        this.conversationDao=new ConversationDao()
    }

    async createBid(mentorId, bidId, data) {
        console.log("Creating bid...",data);

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
      
        if (data.status === "accepted") {
            const mentorToMenteeConversation = await this.conversationDao.findConversation({
                userId: data.mentorId,
                conversations: data.menteeId,
            });
    
            const menteeToMentorConversation = await this.conversationDao.findConversation({
                userId: data.menteeId,
                conversations: data.mentorId,
            });
    
            if (!mentorToMenteeConversation) {
                const mentorToMentee = {
                    userId: data.mentorId,
                    conversations: [data.menteeId],
                };
                await this.conversationDao.upsertConversation(mentorToMentee);
            }
    
            if (!menteeToMentorConversation) {
                const menteeToMentor = {
                    userId: data.menteeId,
                    conversations: [data.mentorId],
                };
                await this.conversationDao.upsertConversation(menteeToMentor);
            }
            
        }
        const updatedBid = await this.bidDao.updateBid(id, data);
        if (!updatedBid) {
            throw new Error("Bid not found");
        }
        if(data.status === "accepted") updateMeetingStatus("accepted",updatedBid.name,updatedBid.email);
        if(data.status === "rejected") updateMeetingStatus("rejected",updatedBid.name,updatedBid.email);
    
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
