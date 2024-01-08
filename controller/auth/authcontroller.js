const User = require("../../model/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

exports.registerUser = async (req, res)=>{

    const {email, username, password} = req.body
  
    //check if email user already exist or not 
    const userFound= await User.find({
      email : email
    })
  
    if (userFound.length > 0 ){
      return res.status(400).json({
        message : "User with that email already registered"
      })
    }
  
  
  // inserting  users to the database userModel
  
  await User.create({
    email : email,
    username : username,
    password : bcrypt.hashSync(password,8)
  })
  res.status(201).json({
    message : "account created successfully"
  })
  
  }


 exports.loginUser =  async (req, res)=>{

// res.send("this is hello")
    const {email, password}= req.body
  
    //SERVER SIDE VALIDATION
    if (!email || !password){
      return res.status(400).json({
       message :  "Please provide Email and Password "
      })
    }
  
  //check if that email user exist or not
   const userFound = await User.find({email:email})
   if (userFound.length == 0){
    return res.status(404).json({
      message : " User with that email is not Registered"
    })
   }
  
  // PASSWORD CHECK
  
  const isMatched = bcrypt.compareSync(password, userFound[0].password)
  
  if(isMatched){
  // GENETRATE TOKEN
  const token = jwt.sign({id : userFound[0]._id}, process.env.SECRET_KEY,{
  expiresIn : '30d'
  })
  
  res.cookie('token', token,{
    httpOnly : true,
  }); // browser ma application tab vitra cookie vanney ma save hunchha
  
    res.status(200).json({
      message : " User logged in successfully",
      // token 
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
    const userExist = await User.find({email : email})
    if(userExist.length == 0){
      return res.status(400).json({
        message : "Email is not registered"
      })
    }

    // SEND OTP TO THAT EMAIL

    const otp = Math.floor(1000 + Math.random()* 9000);
    userExist[0].otp = otp
    await userExist[0].save()

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

     userExists =  await User.find({email : email})
    if(userExists.length == 0 ){
      return res.status(404).json({
        message : "Email is not registered"
      })
    }
  
  // form le value object string ma dinxa tesaile hamle garnu parxa Number type  ma change garnu parxa ie Number(otp)

    if(userExists[0].otp !== (Number(otp))){
      return res.status(400).json({
        message : "Invalid Otp"
      })
    }else{
      //DISPOSE THE OTP SO SAME OTP CANNOT BE USED AGAIN  
      userExists[0].otp = undefined
      userExists[0].isOtpVerified = true;
      await userExists[0].save()

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
    
    const userExists =  await User.find({email : email})
    if(userExists.length == 0 ){
      return res.status(404).json({
       message : "Email is not registered"
      })
    }

    if(userExists[0].isOtpVerified !== true){
      return res.status.json(403).json({
        message : "You cannot perform this action"
      })

    }

    userExists[0].password = bcrypt.hashSync(newPassword,8)
    userExists[0].isOtpVerified = false;
    await userExists[0].save()

    res.status(200).json({
      
      message : "Password changed successfully"
    })
    
  }