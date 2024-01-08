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
        enum : ["tourist","guide","admin"]  
    },

    otp : {
        type : Number,
        
    },

    isOtpVerified :{
        type : Boolean,
        default : false,
        
    }

},{
    timestamps: true
})

const User = mongoose.model("User" , userSchema )
module.exports = User;