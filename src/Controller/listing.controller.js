const ListingServices = require("../Services/listing.service");

module.exports = class ListingController {
    constructor() {
        this.listingServices = new ListingServices();
    }

    createListing = async (req, res) => {
        try {
            const listing = await this.listingServices.createListing(req.body);
            res.status(201).json(listing);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateListing = async (req, res) => {
        try {
            const listingId = req.params.listingId;
            const updatedListing = await this.listingServices.updateListing(listingId, req.body);
            res.status(200).json(updatedListing);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteListing = async (req, res) => {
        try {
            const listingId = req.params.listingId;
            const deletedListing = await this.listingServices.deleteListing(listingId);
            res.status(200).json({ message: "Listing deleted", deletedListing });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getListingById = async (req, res) => {
        try {
            const listingId = req.params.listingId;
            const listing = await this.listingServices.getListingById(listingId);
            res.status(200).json(listing);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAllListings = async (req, res) => {
        try {
            const listings = await this.listingServices.getAllListings();
            res.status(200).json(listings);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateSessionStatus = async (req, res) => {
        try {
            const listingId = req.params.listingId;
            const { status } = req.body;
            const updatedListing = await this.listingServices.updateSessionStatus(listingId, status);
            res.status(200).json(updatedListing);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getListingsByMentorId = async (req, res) => {
        try {
            const mentorId = req.params.mentorId;
            const listings = await this.listingServices.getListingsByMentorId(mentorId);
            res.status(200).json(listings);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
};
