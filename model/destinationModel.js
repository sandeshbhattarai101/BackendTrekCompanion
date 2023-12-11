const mongoose = require("mongoose")

 const destinationSchema = new mongoose.Schema({

    destinationName : {
        type : String,
        required : [true,"destinationName must be provided"]
    },

    destinationImage :{
        type : String

    },
    destinationDescription : {
        type : String,
        required : [true,"destinationDescription must be provided"]
    },
    destinationCost : {
        type : String,
        required : [true,"destinationCost must be provided"]
    },
    completionTime : {
        type : String,
        required : [true,"completiontTime must be provided"]
    },
    tripGrade : {
        type : String,
        required : [true,"tripGrade must be provided"]
    },
    maxAltitude : {
        type : String,
        required : [true,"maxAltitude must be provided"]
    }, 
    destinationStatus :{
        type : String,
        enum : ["published","unpublished"]
    }

 
},{
    timestamps : true
})

//we have to make a model for the schema
 const Destination = mongoose.model("Destination",destinationSchema)
 module.exports = Destination