const Bid = require("../Entities/bid.entities"); // Adjust the path as needed

module.exports = class BidDao {
  model = Bid;

  async createBid(data) {
    return this.model.create(data);
  }

  async getBidById(id) {
    return this.model.findById(id).populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }

  async getAllBids() {
    return this.model.find().populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }

  async updateBid(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBid(id) {
    return this.model.findByIdAndDelete(id);
  }

  async getBidsByMentorId(mentorId) {
    return this.model.find({ mentorId }).populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }
  async getBidsByMenteeId(menteeId) {
    return this.model.find({ menteeId }).populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }
  async getBidsByListingId(listingId) {
    return this.model.find({ listingId }).populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }

  async getBidsByBidId(bidId) {
    return this.model.find({ bidId }).populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }

  async getBidByMentorAndBid(mentorId, bidId) {
    return this.model.findOne({ mentorId, bidId }).populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }

  async updateMeetId(id, meetId) {
    return this.model.findByIdAndUpdate(id, { meetId }, { new: true });
  }

  async getBidsByTopic(topic) {
    return this.model.find({ topic }).populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }

  async getBidDetails(id) {
    return this.model.findById(id).populate("mentorId").populate("menteeId").populate("listingId").populate("meetId");
  }
};
