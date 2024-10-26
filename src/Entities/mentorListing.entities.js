const { Schema,model } = require("mongoose");

const listingSchema = new Schema({
    mentorId: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    domain: {
        type: String
    },
    topic: {
        type: String
    },
    description: {
        type: String
    },
    sessionPrice: {
        type: Number
    },
    sessionStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    }
});
const listing=model("Listing", listingSchema)
module.exports =listing;
