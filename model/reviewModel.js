const mongoose = require("mongoose")
const Schema = mongoose.Schema 

// userId, guideId,rating(Number),message
const reviewSchema = new Schema({
 userId : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : [true,"A review must belong to user"] 
 },
 guideId : {
   type : String,
   required : true,
 },
 rating : {
    type : Number,
    required : true,
 }

})

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review ;
