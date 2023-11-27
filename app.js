const express = require("express")
const app = express();
const { connectDatabase } = require("./database/database")
const User = require("./model/userModel")
const cors = require("cors")

const bcrypt = require("bcryptjs")
// const jwt = require("jsonwentoken")

// TELL NODE TO USE DOTENV
require("dotenv").config()

app.use(cors({
  origin : "http://localhost:5173"
}
))

// node js lai form bata aako data parse gar vaneko ho jun json format ma hunxa
app.use(express.json());
app.use(express.urlencoded({extended:true})) //kaile kaai url encoded ni huna sakxa data tesaile 

//DATABASE CONNECTION FUNCTION FROM database.js
connectDatabase()



//API CALL WITHOUT MVCR ARCHITECTURE

//SIGNUP

app.post("/register", async (req, res)=>{

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

})


//LOGIN

app.post("/login",async (req, res)=>{
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
// const token = jwt.sign({id : userFound[0]._id},procedd.env.SECRET_KEY,{
// expiresIn : '30d'
// })

  res.status(200).json({
    message : " User logged in successfully"
  })
}else{
  res.status(404).json({
    message : "Invalid email or password"
  })
}

})

const PORT = process.env.PORT

app.listen(PORT,(res, req )=>{
  console.log(`Server has started at port ${PORT}`)
})