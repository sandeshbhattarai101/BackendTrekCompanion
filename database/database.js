const mongoose = require("mongoose")


exports.connectDatabase = async()=>{



    //connecting to database: tyo mongodb ko database ko link halera password option ma tesko password haalne
await mongoose.connect(process.env.DATABASE_URL)
 
console.log(" Database connected successfully")

}