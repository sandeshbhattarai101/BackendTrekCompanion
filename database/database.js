const mongoose = require("mongoose")
const User = require("../model/userModel")


exports.connectDatabase = async()=>{



    //connecting to database: tyo mongodb ko database ko link halera password option ma tesko password haalne
await mongoose.connect(process.env.DATABASE_URL)
 
console.log(" Database connected successfully")


// Data seeding for Admin i.e. admin ko credentials chai database ma paile nai seed garne (static data)

// check whether admin exists or not
const isAdminExists = await User.findOne({email : "admin@gmail.com"})

if(!isAdminExists){

    await User.create({
    
        email : "admin@gmail.com",
        password : "admin",
        username : "admin",
        role : "admin"
    
    })
    console.log("Admin seeded successfully")
}else{
    console.log("Admin already seeded ")
}



}