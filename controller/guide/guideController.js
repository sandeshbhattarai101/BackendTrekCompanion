const Review = require("../../model/reviewModel");
const Guide = require("../../model/guideModel")


exports.getGuides = async(req,res)=>{

    const guides = await Guide.find()
    if(guides.length == 0 ){
        res.status(400).json({
            message : "No guides Found",
           data : []
        })
    }else{
        res.status(200).json({
            message : "Products Fetched Successfully",
            data : guides  
        })
    }
   
}



  // Get  Guide and their Reviews

  exports.getGuide = async(req, res)=>{
    const{id}= req.params
    if(!id){
      return res.status(400).json({
        message : "Please provide id(GuideId)"
      })
    }
    const guide = await Guide.find({_id : id})

    const guideReviews = await Review.find({guideId : id}).populate("userId")
   // console.log(guideReviews)
    if(guide.length == 0){
      res.status(400).json({
        message : " No guide found  with that id",
        guide : [],
        guideReviews : []
      })
    }else{
      res.status(200).json({
        message : "Guide fetched successfully",
        guide,
        guideReviews 
      })
    }
  }
