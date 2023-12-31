const Guide = require("../../../model/guideModel")
const bcrypt = require("bcryptjs")



// get my profile controller 
exports.getMyProfile = async(req,res)=>{
    const guideId = req.guide.id 
    const myProfile = await Guide.findById(guideId)
    // send response
    res.status(200).json({
        data : myProfile,
        message : "Profile fetched successfully"
    })
}



// update my profile controller 
exports.updateMyProfile = async(req,res)=>{
    const {userName, email} = req.body 
    const guideId = req.guide.id 
    // update profile 
  const updatedData =   await Guide.findByIdAndUpdate(guideId,{userName,email},{
        runValidators : true,
        new : true 
    })
    res.status(200).josn({
        message : "Profile updated successfully",
        data : updatedData
    })
}


// delete my profile 
exports.deleteMyProfile = async(req,res)=>{
    const guideId = req.guide.id ; 
    await Guide.findByIdAndDelete(guideId)
    res.status(200).json({
        message : "Profile delete successfully",
        data : null
    })
}

// update my password 
exports.updateMyPassword = async(req,res)=>{
    const guideId = req.guide.id 
    const {oldPassword,newPassword,confirmPassword} = req.body 
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            message : "Please provide oldPassword,newPassword,confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "newPassword and oldPassword didnt matched"
        })

    }
    // taking out the hash of the old password 
    const guideData = await Guide.findById(guideId)
    const hashedOldPassword  = guideData.password 


    // check if oldPassword is correct or not
    const isOldPasswordCorrect =  bcrypt.compareSync(oldPassword,hashedOldPassword)
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message : "OldPassword didn't matched"
        })
    }
    // matched vayo vaney 
    guideData.password= bcrypt.hashSync(newPassword,12)
    await guideData.save()
    res.status(200).json({
        message  : "Password Changed successfully",
        
    })
}