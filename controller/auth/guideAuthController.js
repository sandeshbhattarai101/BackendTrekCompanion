const Guide = require("../../model/guideModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

exports.registerGuide = async (req, res)=>{

    const {email, username, password} = req.body
  
    //check if email user already exist or not 
    const guideFound= await Guide.find({
      email : email
    })
  
    if (guideFound.length > 0 ){
      return res.status(400).json({
        message : "Guide with that email already registered"
      })
    }
  
  
  // inserting  guides to the database userModel
  
  await Guide.create({
    email : email,
    username : username,
    password : bcrypt.hashSync(password,8)
  })
  res.status(201).json({
    message : " Guide account created successfully"
  })
  
  }


 exports.loginGuide =  async (req, res)=>{

// res.send("this is hello")
    const {email, password}= req.body
  
    //SERVER SIDE VALIDATION
    if (!email || !password){
      return res.status(400).json({
       message :  "Please provide Email and Password "
      })
    }
  
  //check if that email user exist or not
   const guideFound = await Guide.find({email:email})
   if (guideFound.length == 0){
    return res.status(404).json({
      message : " Guide with that email is not Registered"
    })
   }
  
  // PASSWORD CHECK
  
  const isMatched = bcrypt.compareSync(password, guideFound[0].password)
  
  if(isMatched){
  // GENETRATE TOKEN
  const token = jwt.sign({id : guideFound[0]._id}, process.env.SECRET_KEY,{
  expiresIn : '30d'
  })
  
  res.cookie('token',token) // browser ma application tab vitra cookie vanney ma save hunchha
  
    res.status(200).json({
      message : " Guide logged in successfully",
      token 
    })
  }else{
    res.status(404).json({
      message : "Invalid email or password"
    })
  }
  
  }


  // FORGOT PASSWORD
  exports.forgotPassword = async (req, res)=>{

    const {email} = req.body

    // if(!email){
    //   return res.status(400).json({
    //     message :"Please provide email"
    //   })
    // }
 
    // check if that email is registered or not
    const guideExist = await Guide.find({email : email})
    if(guideExist.length == 0){
      return res.status(400).json({
        message : "Email is not registered"
      })
    }

    // SEND OTP TO THAT EMAIL

    const otp = Math.floor(1000 + Math.random()* 9000);
    guideExist[0].otp = otp
    await guideExist[0].save()

    sendEmail({
      email : email,
      subject : "Your Otp For TrekCompanion Forgot Password",
      message : `Your otp is ${otp} . Don't share this with anyone.`
    })
   res.status(200).json({
    message: "OTP sent successfully"
   })

  }


  // VERIFY OTP

  exports.verifyOtp = async ( req, res)=>{
    const{email, otp } = req.body

    if(!email || !otp){
      return res.status(400).json({
        message : " Please provide email , otp"
      })
    }

    // CHECK IF OTP IS CORRECT OR NOT OF THAT EMAIL

     guideExists =  await Guide.find({email : email})
    if(guideExists.length == 0 ){
      return res.status(404).json({
        message : "Email is not registered"
      })
    }
  
  // form le value object string ma dinxa tesaile hamle garnu parxa Number type  ma change garnu parxa ie Number(otp)
  if(guideExists[0].otp !== (Number(otp))){
    return res.status(400).json({
      message : "Invalid Otp"
    })
    }else{
      //DISPOSE THE OTP SO SAME OTP CANNOT BE USED AGAIN  
      guideExists[0].otp = undefined
      guideExists[0].isOtpVerified = true;
      await guideExists[0].save()

      res.status(200).json({
        message : "Otp is correct"
      })
    }


  }


  exports.resetPassword = async ( req, res)=>{
    const {email, newPassword, confirmPassword} = req.body
    if(!email || !newPassword || !confirmPassword){
      return res.status(400).json({
        message : "Please provide email, newPassword, confirmPassword"
      })
    }
    if(newPassword !== confirmPassword){
      return res.status(400).json({
        message : "newPassword and confirmPassword does not match"
      })
    }
    
    const guideExists =  await Guide.find({email : email})
    if(guideExists.length == 0 ){
      return res.status(404).json({
       message : "Email is not registered"
      })
    }

    if(guideExists[0].isOtpVerified !== true){
      return res.status.json(403).json({
        message : "You cannot perform this action"
      })

    }

    guideExists[0].password = bcrypt.hashSync(newPassword,8)
    guideExists[0].isOtpVerified = false;
    await guideExists[0].save()

    res.status(200).json({
      
      message : "Password changed successfully"
    })
    
  }