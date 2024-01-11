const  jwt = require("jsonwebtoken")
const promisify = require("util").promisify
const User = require("../model/userModel")

const isAuthenticated = async (req, res, next)=>{
   //const token = req.headers.authorization  //postman ma headers field ma key ma Authorization capital vayeni eta sano hunu parxa
     const token = req.cookies.token      //browser ma vako token linxa


    if(!token){
      return  res.status(400).json({ //else vaena vane return halna birisnu hunna
            message : "Please login"
        })
    }

    //encrypt garna jwt.sign ani verify garna /decrypt garn jwt.verify
    //verify function le lastma callback function argument linxa teslai esari garda ni vayo natra 
    //jhyau lagxa vane promisify inbuilt package use garda ni vayo
//    const decoded = await  jwt.verify(token, process.env.SECRET_KEY,(err,success)=>{
//         if(err){
//             res.status(400).json({
//                 message : "Invalid Token"
//             })
//         }else{
//             res.status(200).json({
//                 message : "Valid Token"
//             })
//         }
//      }) 

    // ALTERNATIVE
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
        //check if decoded.id(userId) exists in user Table
        
        const doesUserExist = await User.findOne({_id : decoded.id})
        if(doesUserExist){       
            req.user = doesUserExist  //yo req.user ko value chai hamle yo middleware jun ma use garexam tesko ma access garnu pauxam next le garda
            //  req.token = token
           
            next() // middle user jaha use hunxa tespaxi ko function haru ma access garna dinxa
        }else{
            return res.status(400).json({
                message : "User doesn't exists with that token id"
            })
        }

    } catch (error) {
        
        res.status(500).json({
            message : error.message
        })
    }


}



module.exports = isAuthenticated