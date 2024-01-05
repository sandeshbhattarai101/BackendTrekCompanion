const mongoose = require ("mongoose");


const guideSchema = new mongoose.Schema({
    email:{
        type : String,
        required : [true,"Email must be provided"],
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
        enum : ["guide"],
        default : "guide",
       
    },
    otp : {
        type : Number,
        
    },

    isOtpVerified :{
        type : Boolean,
        default : false,
        
    }

})

const Guide = mongoose.model("Guide" , guideSchema )
module.exports = Guide;