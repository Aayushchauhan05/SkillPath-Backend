const mongoose = require('mongoose');

const menteeSchema = new mongoose.Schema({
  menteeId: {
    type: String,
    ref:"User"
  },
  mentorId:{
 type: String,
    ref:"User"
  },
  listingId:{
type: String,
    ref:"Listing"
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  payingAmount: {
    type: Number,
    required: true,
  },
  meetLink:{
    type:String,
  },
  startDate: {
    type: Date,
       
   },
   endDate: {
    type: Date,
       
   },
  status:{
type:String,
default:"pending"
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Bids', menteeSchema);
