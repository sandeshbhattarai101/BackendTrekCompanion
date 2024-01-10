const Chat = require("../../model/chatModel");
const Message = require("../../model/messageModel");
const User = require("../../model/userModel");


exports.sendMessage = async(req, res)=>{
    const {content, chatId} = req.body;

    if(!content || !chatId){
        return res.status(400).json({
            message : "Invalid data passed into request"
        })
    }

    var newMessage = {
        sender : req.user._id,
        content : content,
        chat : chatId,

    }

    var message = await Message.create(newMessage);

    message = await message.populate("sender", "username");
    message = await message.populate("chat",);
    message = await User.populate(message, {
        path : "chats.users",
        select: "username email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage : message,
    })

    res.json(message);

}



exports.allMessages = async(req, res)=>{

    const messages = await Message.find({ chat : req.params.chatId})
    .populate( "sender","username email")
    .populate("chat")

    res.json(messages);

}