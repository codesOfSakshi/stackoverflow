const db = require('../config/mysql.config');

var Message = function(message){
    this.messageId = message.messageId;
    this.createdAt = message.createdAt
    this.senderId = message.senderId;
    this.senderName = message.senderName;
    this.receiverId = message.receiverId;
    this.receiverName = message.receiverName;
    this.messageString = message.messageString;
}


// Send Message
Message.sendMessage = (messageBody, result) => {

    db.query('INSERT INTO message SET ?', messageBody, (err, res) => {
        console.log("QUERY MADE")

        if(err){
            console.log(err);
            console.log("IN HERE")

            result(null, {status:false, message:"Message exists"},err);
            // console.log(result)
        }
        else{
            // console.log(res);
            console.log("IN HERE")

            result(null, {status: true, message:'Message Created'});
        }
    })
}


// Get All Messages between two users
Message.receiveAllMessages = (result) =>{

    db.query('SELECT * FROM message', (err,res) =>{
        if(err){
            console.log("Error while getting conversation: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}



// Get All Messages between two users
Message.receiveChat = (reqBody, result) =>{

    db.query('SELECT * FROM message WHERE (senderId = ? AND receiverId = ?) OR (receiverId = ? AND senderId = ?)',
    [reqBody.senderId, reqBody.receiverId,reqBody.senderId, reqBody.receiverId ], 
    (err,res) =>{
        if(err){
            console.log("Error while getting conversation: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}


module.exports = Message;