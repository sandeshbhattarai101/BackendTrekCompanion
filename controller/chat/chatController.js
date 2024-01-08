


exports.getChats = async(req, res)=>{
    const chats = await Chat.find()
    if(chats.length == 0){
        res.status(400).json({
            message : "No chat found ",
          chats : []
    
        })
    }else{
        res.status(200).json({
            message : "Chats fetched successfuly",
            data : chats
        })
    }
}

exports.getChat = async(req, res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id"
        })
    }


    const singleChat = await Chat.find({_id : id})
    if(singleChat.length == 0){
        res.status(400).json({
            message : "No chat found with that id ",
            singleChat : []
    
        })
    }else{
        res.status(200).json({
            message : "Chat fetched successfuly",
            data : singleChat
        })
    }
}