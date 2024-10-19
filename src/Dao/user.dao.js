const { v4 :uuidv4 } = require("uuid")
const User =require ("../Entities/user.entities")

module.exports= class userDao {
   model=User
    async createUser(data){
return this.model.create(data)
    }
    async findUser(id){
return this.model.findById(id)
    }
    async createEducation(userId,data){
const id=uuidv4;

        return this.model.findByIdAndUpdate(userId,{$set:{[`education.${id}`]:{_id:id,...data}}},{new:true})
    }
    async updateUser(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
      }
    
      
      async deleteUser(id) {
        return this.model.findByIdAndDelete(id);
      }
    

      async findUserByEmail(email) {
        return this.model.findOne({ email });
      }
    
    
      async findAllUsers() {
        return this.model.find();
      }
    
  
      async addExperience(userId, experience) {
        return this.model.findByIdAndUpdate(
          userId,
          { $set: { [`experience.${experience.companyName}`]: experience } },
          { new: true }
        );
      }
    
   
      async addEducation(userId, education) {
        return this.model.findByIdAndUpdate(
          userId,
          { $set: { [`education.${education.institution}`]: education } },
          { new: true }
        );
      }
}