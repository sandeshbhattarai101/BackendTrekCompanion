const Destination = require("../../../model/destinationModel")


exports.createDestination = async (req, res)=>{

    const file = req.file
    let filePath;
    if(!file){
        filePath = "https://www.pexels.com/photo/man-walking-on-trail-1392099/"  //file  aayena vane default image 
    }else{
        filePath = req.file.filename
    }
    const {destinationName, destinationDescription, destinationCost, completionTime, tripGrade, maxAltitude, destinationStatus } = req.body
if(!destinationName || !destinationDescription || !destinationCost || !completionTime || !tripGrade || !maxAltitude || !destinationStatus ){
    return res.status(400).json({
        message : "Please provide destinationName, destinationDescription ,destinationCost ,completionTime ,tripGrade , maxAltitude , destinationStatus"
    })
}

// insert into the Destination collection/table

await Destination.create({
    destinationName ,
    destinationImage :"http://localhost:3000/" + filePath, //local host hale paxi frontend ma link imga ko src ma concat garna paren
    destinationDescription ,
    destinationCost ,
    completionTime ,
    tripGrade , 
    maxAltitude , 
    destinationStatus
})

res.status(200).json({
    message : " Destination Created Successfully"
})

}

exports.renderDestination = async (req,res)=>{

const destinations = await Destination.find()
if (destinations.length == 0){
    res.status(400).json({
        message : "No destinations found",
        data: []
    })
}else{
    res.status(200).json({
        message: "Destinations Fetched Successfully",
        data: destinations
    })
}


}