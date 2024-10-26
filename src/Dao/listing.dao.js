const { v4: uuidv4 } = require("uuid");
const Listing = require("../Entities/mentorListing.entities");

module.exports = class ListingDao {
    model = Listing;

    async createListing(data) {
        return this.model.create(data);
    }

    async findListingById(id) {
        return this.model.findById(id);
    }

    async updateListing(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteListing(id) {
        return this.model.findByIdAndDelete(id);
    }

    async findAllListings() {
        return this.model.find().populate("mentorId").sort({ createdAt: -1 });
    }

    async updateSessionStatus(id, status) {
        return this.model.findByIdAndUpdate(id, { sessionStatus: status }, { new: true });
    }

    async findListingsByMentorId(mentorId) {
        return this.model.find({ mentorId });
    }
};
