const mongoose = require ("mongoose")


const adminSchema = new mongoose.Schema({
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

const Admin = mongoose.model("Admin" , adminSchema)
module.exports = Admin;