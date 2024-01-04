const mongoose = require ("mongoose")


const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : [true,"userEmail must be provided"],
    //    unique : true  //unique huna parxa vanera define gareko

    }, 

    username : {
        type : String,
    },

    password : {
        type : String,
        required : [true,"Password must be provided"],
        minlength : 8,
       
    },
    role : {
        type : String,
        enum : ["tourist","admin"],
        default : "tourist",
       
    },

    otp : {
        type : Number,
        
    },

    isOtpVerified :{
        type : Boolean,
        default : false,
        
    }

})

const User = mongoose.model("User" , userSchema )
module.exports = User;