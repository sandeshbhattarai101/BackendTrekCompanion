const User = require("../../model/userModel")
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken")
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
  //GENETRATE TOKEN
//   const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
//   expiresIn : '30d'
//   })
  
    res.status(200).json({
      message : " User logged in successfully"
    })
  }else{
    res.status(404).json({
      message : "Invalid email or password"
    })
  }
  
  }
