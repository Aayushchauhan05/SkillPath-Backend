const express = require("express");
const BidController = require("../Controller/bid.controller");
const {
    CREATE_BID,
    UPDATE_BID,
    DELETE_BID,
    GET_BID,
    GET_BIDS_BY_MENTOR,
    GET_BIDS_BY_MENTEE,
    GET_BIDS_BY_LISTING,
} = require("../constant/bid.constant");
const route = express.Router();
const bidController = new BidController();

route.post(CREATE_BID, bidController.createBid);
route.put(UPDATE_BID, bidController.updateBidStatus);
route.delete(DELETE_BID, bidController.deleteBid);
route.get(GET_BID, bidController.getBidById);
route.get(GET_BIDS_BY_MENTOR, bidController.getBidsByMentor);
route.get(GET_BIDS_BY_MENTEE, bidController.getBidsByMentee);
route.get(GET_BIDS_BY_LISTING, bidController.getBidsByListing);

module.exports = route;
