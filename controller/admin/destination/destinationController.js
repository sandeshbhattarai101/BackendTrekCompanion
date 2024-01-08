const Destination = require("../../../model/destinationModel")
const fs = require("fs")


exports.createDestination = async (req, res)=>{

    const file = req.file
    console.log(file)
    let filePath;
    if(!file){
        filePath = "1702307901323-mountain1.jpg"  //file  aayena vane default image 
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
    destinationImage : process.env.BACKEND_URL + filePath, //local host hale paxi frontend ma link imga ko src ma concat garna paren
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

exports.getDestinations = async (req,res)=>{

const destinations = await Destination.find()
if (destinations.length == 0){
    res.status(400).json({
        message : "No destinations found",
        data: []
    })
}else{
    res.status(200).json({
        message: "Destinations Fetched Successfully",
        data : destinations
    })
}


}


exports.getDestination = async(req, res)=>{
    const {id} = req.params
    if (!id){
        return res.status(400).jsom({
            message : "Please provide id(destination)"
        })

}
const destination  = await Destination.find({_id : id})
if(destination.length == 0){
    res.status(400).json({
        message : "No destination found with that id ",
        destination : []

    })
}else{
    res.status(200).json({
        message : "Destination fetched successfuly",
        data : destination
    })
}

}

exports.deleteDestination = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const oldData = await Destination.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
    const oldDestinationImage = oldData.destinationImage
    const lengthToCut =  process.env.BACKEND_URL.lengthconst
    const finalFilePathAfterCut = oldDestinationImage.slice(lengthToCut)
 
        //REMOVE FILE FROM UPLOADS FOLDER
        fs.unlink("./uploads/" + finalFilePathAfterCut,(err)=>{
            if(err){
                console.log("error deleting file",err)

            }else{
                console.log("file deleted successfully")
            }
        })
        
    await Destination.findByIdAndDelete(id)
    res.status(200).json({
        message : "Destination deleted successfully"
    })
}
exports.editDestination = async(req,res)=>{
    const {id} = req.params
    const {destinationName, destinationDescription, destinationCost, completionTime, tripGrade, maxAltitude, destinationStatus } = req.body

    if(!destinationName || !destinationDescription || !destinationCost || !completionTime || !tripGrade || !maxAltitude || !destinationStatus ){
        return res.status(400).json({
            message : "Please provide destinationName, destinationDescription ,destinationCost ,completionTime ,tripGrade , maxAltitude , destinationStatus"
        })
    }
    const oldData = await Destination.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
    const oldDestinationImage = oldData.destinationImage
    const lengthToCut =  process.env.BACKEND_URL.lengthconst
    const finalFilePathAfterCut = oldDestinationImage.slice(lengthToCut)
    if(req.file && req.file.filename){
        //REMOVE FILE FROM UPLOADS FOLDER
        fs.unlink("./uploads/" + finalFilePathAfterCut,(err)=>{
            if(err){
                console.log("error deleting file",err)

            }else{
                console.log("file deleted successfully")
            }
        })
    }
    const datas = await Destination.findByIdAndUpdate(id,{
        destinationName ,
        destinationImage : req.file && req.file.filename ? process.env.BACKEND_URL + req.file.filename : oldDestinationImage,
        destinationDescription ,
        destinationCost ,
        completionTime ,
        tripGrade , 
        maxAltitude , 
        destinationStatus
    },{
        new : true //jun update vako tei data return help garxa
    })
    res.status(200).json({
        message : 'Destination updated successfully',
        datas

    })
}