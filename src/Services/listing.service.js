const ListingDao = require("../Dao/listing.dao");

module.exports = class ListingServices {
    constructor() {
        this.listingDao = new ListingDao();
    }

    async createListing(body) {
        if (!body || !body.mentorId || !body.domain || !body.topic || !body.sessionPrice) {
            throw new Error('Invalid data for creating a listing');
        }
        const listing = await this.listingDao.createListing(body);
        if (!listing) {
            throw new Error('Listing creation failed');
        }
        return listing;
    }

    async updateListing(listingId, update) {
        if (!listingId || !update) {
            throw new Error('Listing ID and update data are required');
        }
        const updatedListing = await this.listingDao.updateListing(listingId, update);
        if (!updatedListing) {
            throw new Error('Listing update failed or listing not found');
        }
        return updatedListing;
    }

    async deleteListing(listingId) {
        if (!listingId) {
            throw new Error('Listing ID is required');
        }
        const deletedListing = await this.listingDao.deleteListing(listingId);
        if (!deletedListing) {
            throw new Error('Listing deletion failed or listing not found');
        }
        return deletedListing;
    }

    async getListingById(listingId) {
        if (!listingId) {
            throw new Error('Listing ID is required');
        }
        const listing = await this.listingDao.findListingById(listingId);
        if (!listing) {
            throw new Error('Listing not found');
        }
        return listing;
    }

    async getAllListings() {
        const listings = await this.listingDao.findAllListings();
        if (!listings || listings.length === 0) {
            throw new Error('No listings found');
        }
        return listings;
    }

    async updateSessionStatus(listingId, status) {
        if (!listingId || !status) {
            throw new Error('Listing ID and session status are required');
        }
        const updatedListing = await this.listingDao.updateSessionStatus(listingId, status);
        if (!updatedListing) {
            throw new Error('Session status update failed or listing not found');
        }
        return updatedListing;
    }

    async getListingsByMentorId(mentorId) {
        if (!mentorId) {
            throw new Error('Mentor ID is required');
        }
        const listings = await this.listingDao.findListingsByMentorId(mentorId);
        if (!listings || listings.length === 0) {
            throw new Error('No listings found for the specified mentor');
        }
        return listings;
    }
};
