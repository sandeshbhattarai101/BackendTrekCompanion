const mongoose = require("mongoose")
const adminSeeder = require("../adminSeeder")


exports.connectDatabase = async()=>{



    //connecting to database: tyo mongodb ko database ko link halera password option ma tesko password haalne
await mongoose.connect(process.env.DATABASE_URL)
 
console.log(" Database connected successfully")


//Admin ko credentials paile nai Seed garya Database ma

adminSeeder()


}