const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
        chatName :{ type: String , trim:true},
        user: {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        guide : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Guide"
        },
        latestMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message"
         }
        },{
            timestamps : true,
        });

        const Chat = mongoose.model("Chat", chatModel);

        module.exports = Chat;