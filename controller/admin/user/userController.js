const Review = require("../../../model/reviewModel")
const User = require("../../../model/userModel")

exports.getGuides = async(req, res)=>{
    const users = await User.find({role : {$eq : "guide"}})//$eq= equal t0 //$ne = not equal
if (users.length > 1){

    const reviews = await getReviewForGuide(users);

  //  console.log(reviews)

    res.status(200).json({
        message : "User fetched successfully",
        data : reviews
    })
}else{
    res.status(404).json({
        message : "User Collection is empty",
        data : []
    })
}

}
// for review of each guide
const getReviewForGuide = async (users) => {
    const getData = await Promise.all(
      users.map(async (user) => {
       let value =  await Review.find({ guideId: user._id })
       let rating = 0;

       value.forEach((review)=>{
        rating += review.rating
       })

       rating = (rating/value.length).toFixed(1)
       let ratingObj = {
         rating: rating,
        _id : user._id,
         username : user.username,
         email : user.email,
         rate : user.rate
    }
        return ratingObj;
        })
        
        );

        // Changing rating = NaN into 0 
      const reviewData =  getData.map((review)=>{
          if(review.rating == "NaN"){
              return {...review, rating: "0"}
          }else{
            return review
          }
      }).sort((a, b) => b.rating - a.rating)

       return reviewData;
};


exports.getGuide = async(req, res)=>{
    const guideId = req.params.id
    if(!guideId){
                return res.status(400).json({
                    message : "Please provide userId"
                })
            }
        
   const guide = await User.findById(guideId)
   const review = await Review.find({ guideId });

    if(!guide){
        res.status(404).json({
            message : " Guide not found with that userid",
            data : []
        })
      }else{
    res.status(200).json({
        message : "Guide found",
        data : {guide, review}
    })
}
}


// delete User Api

// exports.deleteUser = async(req, res)=>{
//     const userId = req.params.id
//     if(!userId){
//         return res.status(400).json({
//             message : "Please provide userId"
//         })
//     }

//     //check if that userId usrs exists or not
//     const user = await User.findById(userId)
//     if(!user){
//         res.status(404).json({
//             message : " USer not found with that userid"
//         })

//     }else{
//         await User.findByIdAndDelete(userId)
//         res.status(200).json({
//             message : 'User deleted successfully'

//         })
//     }



// }