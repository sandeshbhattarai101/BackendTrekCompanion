const mongoose = require ("mongoose")


const helpSchema = new mongoose.Schema({
    name:{
        type : String,
   
    }, 

    email : {
        type : String,
    },

    mobileNo : {
        type : Number,
    },
    message : {
        type : String,
    }


})

const Help = mongoose.model("Help" , helpSchema)
module.exports = Help;