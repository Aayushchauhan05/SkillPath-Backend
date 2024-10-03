const User =require ("../Entities/user.entities")

module.exports= class userDao {
    model=User
    async createUser(data){
return this.model.create(data)
    }
    async findUser(id){
return this.model.findById(id)
    }
}