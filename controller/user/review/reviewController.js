 const Guide = require("../../../model/guideModel")
 const Review = require("../../../model/reviewModel")


 exports.createReview = async(req,res)=>{
     const userId = req.user.id
     const {rating,message} = req.body 
     const guideId = req.params.id 
     //console.log(req.body, guideId)
     if(!rating || !message || !guideId) {
         return res.status(400).json({
             message : "Please provide rating, message, guideId"
         })
     }
     // check if that productId product exists or not
     const guideExist = await Guide.findById(guideId)
     if(!guideExist){
         return res.status(404).json({
             message : 'Guide with that guideId doesnot exist'
         })
    }
     // insert them into Review 
     await Review.create({
         userId ,
         guideId ,
         rating ,
         message 
     })
     res.status(200).json({
         message : "Review added successfully"
     })
 }



 exports.getMyReviews = async(req,res)=>{
    const userId = req.user.id  
     const reviews = await Review.find({userId})
     if(reviews.length == 0 ){
         res.status(404).json({
             message : "You haven't given review to any products yet",
             reviews : []
         })
     }else{
         res.status(200).json({
             message : "Review fetched successfully",
            data :  reviews
         })
     }
 }
 

 exports.deleteReview = async(req,res)=>{
     const reviewId   = req.params.id 
     // check if that user created this review 
     const userId = req.user.id 
     if(!reviewId){
         res.status(400).json({
             message : "Please provide reviewId "
         })
     }
     const review = Review.findById(reviewId)
    const ownerIdOfReview = review.userId 
     if(ownerIdOfReview !== userId){
         return res.status(400).json({
             message : "You don't have permission to delete this review"
         })
     } 

 
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
         message : "Review delete successfully"
     })

 }

 exports.addGuideReview = async(req,res)=>{
     const guideId = req.params.id 
     const {rating,message} = req.body 
     const userId = req.user.id 
     const review = {
         userId , 
         rating,
         message,

     }
     const guide = await Guide.findById(guideId)
     guide.reviews.push(review) 
     await guide.save() 
     res.json({
         message : "Review done"
     })
 }