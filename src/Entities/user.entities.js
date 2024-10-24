const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id:{
type:String,
require:true
  },
  username: {
    type: String,
   
  },
  email: {
    type: String,
    required: true,
    
  },
  education:{
type:Map,
of:new mongoose.Schema ({
institution:{
  type:String,

},
year:{type:mongoose.Schema.Types.Date}
})
  },
  experience:{
    type:Map,
    of:new mongoose.Schema ({
    companyName:{
      type:String,
    
    },
    projects:[{
type:String
    }],
    startDate:{type:mongoose.Schema.Types.Date},
    endDate:{type:mongoose.Schema.Types.Date},
    })
      },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role:{
    type:String
    
      
  }
  

});

const User = mongoose.model('User', userSchema);

module.exports = User;
