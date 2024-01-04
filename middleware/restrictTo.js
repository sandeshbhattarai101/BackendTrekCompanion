
//rest operator vaneko parameter ma ...array  pass vayo vane hunxa ani array convert garxa argument lai
//jati ota parameter pass vayeni array ma rakhxa
//spread operator vaneko body ma ...array  pass vayo vane hunxa, individual item haru spread garera dekhauxa
const restrictTo = (...roles)=>{
    return (req, res, next)=>{
       const userRole = req.user.role  //req.user vitra ko role ko value pass garyo userRole ma 
       if(!roles.includes(userRole)){   //restrictTo("admin") i.e ...roles pass garexam so userRole admin vaye matra next hunxa 
                res.status(403).json({
            message : "You don't have permission for this. Forbidden"
        })
       }else{
        next()
       }
    }
}


module.exports = restrictTo