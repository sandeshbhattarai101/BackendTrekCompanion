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
    type : Schema.Types.ObjectId,
    ref : "Guide", //guide table sanga reference garnu paryo //model(Table) ko name rakhnu paryo
    required : [true,"A review must be of guide"]

 },
 rating : {
    type : Number,
    required : true,
    default : 3
 },
 message : {
    type : String,
    required : true
 }

})

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review ;
