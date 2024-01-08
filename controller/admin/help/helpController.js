const Help = require("../../../model/helpModel")

exports.createHelp = async(req,res)=>{
    const{name,email,mobileNo,message} = req.body;
    

await Help.create({
    name : name,
    email : email,
    mobileNo : mobileNo,
    message : message
})
res.status(200).json({
    message : "Message added successfully"
})
}