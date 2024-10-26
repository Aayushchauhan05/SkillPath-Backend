const express = require("express");
const ListingController = require("../Controller/listing.controller");
const {
    CREATE_LISTING,
    UPDATE_LISTING,
    DELETE_LISTING,
    GET_LISTING_BY_ID,
    GET_ALL_LISTINGS,
    UPDATE_SESSION_STATUS,
    GET_LISTINGS_BY_MENTOR_ID
} = require("../constant/listing.constant");

const router = express.Router();
const listingController = new ListingController();

router.post(CREATE_LISTING, listingController.createListing);
router.put(UPDATE_LISTING, listingController.updateListing);
router.delete(DELETE_LISTING, listingController.deleteListing);
router.get(GET_LISTING_BY_ID, listingController.getListingById);
router.get(GET_ALL_LISTINGS, listingController.getAllListings);
router.put(UPDATE_SESSION_STATUS, listingController.updateSessionStatus);
router.get(GET_LISTINGS_BY_MENTOR_ID, listingController.getListingsByMentorId);

module.exports = router;
