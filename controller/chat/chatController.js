const Chat = require("../../model/chatModel");
const User = require("../../model/userModel");

exports.accessChat = async(req, res)=>{
    const {userId} = req.body;
    if(!userId){
        console.log("UserId param not sent with request")
        return res.status(400).json({
            message : 'Something went wrong'
        })
    }


    var isChat = await Chat.find({
        $and: [
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq: userId}}},
        ],
    }).populate('users',"-password").populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'userName email',
    });

    if(isChat.length > 0 ) {
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: 'sender',
            users:[req.user._id, userId],
        }
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({_id : createdChat._id}).populate('users',"-password")
        res.send(FullChat);
    }   

}

exports.fetchChats = async(req, res)=>{
    var chats = await Chat.find({users:{$elemMatch:{$eq: req.user._id}}}).populate("users","-password").populate("latestMessage").sort({updatedAt : -1})

    chats = await User.populate(chats, {
        path: 'latestMessage.sender',
        select: 'userName email',
    }); 
    
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

// exports.getChat = async(req, res)=>{
//     const {id} = req.params
//     if(!id){
//         return res.status(400).json({
//             message : "Please provide id"
//         })
//     }


//     const singleChat = await Chat.find({_id : id})
//     if(singleChat.length == 0){
//         res.status(400).json({
//             message : "No chat found with that id ",
//             singleChat : []
    
//         })
//     }else{
//         res.status(200).json({
//             message : "Chat fetched successfuly",
//             data : singleChat
//         })
//     }
// }