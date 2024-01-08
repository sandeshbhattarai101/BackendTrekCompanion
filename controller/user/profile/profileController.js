const User = require("../../../model/userModel")
const bcrypt = require("bcryptjs")



// get my profile controller 
exports.getMyProfile = async(req,res)=>{
    const userId = req.user.id 
    const myProfile = await User.findById(userId)

    
    console.log(myProfile)
    // send response
    res.status(200).json({
        data : myProfile,
        message : "Profile fetched successfully"
    })
}



// update my profile controller 
exports.updateMyProfile = async(req,res)=>{
    const {userName,email} = req.body 
    const userId = req.user.id 
    console.log(userId)
    // update profile 
  const updatedData =   await User.findByIdAndUpdate(userId,{userName,email},{
        runValidators : true,
        new : true 
    })
    res.status(200).json({
        message : "Profile updated successfully",
        data : updatedData
    })
}


// delete my profile 
exports.deleteMyProfile = async(req,res)=>{
    const userId = req.user.id ; 
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message : "Profile delete successfully",
        data : null
    })
}

// update my password 
exports.updateMyPassword = async(req,res)=>{
    const userId = req.user.id 
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
    const userData = await User.findById(userId)
    const hashedOldPassword  = userData.password 


    // check if oldPassword is correct or not
    const isOldPasswordCorrect =  bcrypt.compareSync(oldPassword,hashedOldPassword)
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message : "OldPassword didn't matched"
        })
    }
    // matched vayo vaney 
    userData.password= bcrypt.hashSync(newPassword,12)
    await userData.save()
    res.status(200).json({
        message  : "Password Changed successfully",
        
    })
}





// get all guides

exports.allGuides = async(req, res)=>{
    const keyword = req.query.search ? {
        $or:[
            { username :{ $regex: req.query.search, $options: 'i'}},
            { email :{ $regex: req.query.search, $options: 'i'}},

        ]
    } : {};

    const guides = await Guide.find(keyword);
    res.send(guides);
}