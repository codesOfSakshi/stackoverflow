const MessageModel = require('../models/message')

// Get All Tags
exports.sendMessage = (req, res) => {
    console.log("Inside Messsage Controller: Send Message");

    const messageBody = req.body;
    MessageModel.sendMessage( messageBody,( err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else{
            console.log("Message Sent");
            console.log(result);
            res.status(200).send(result);
        }
    })
}


// Receive All messages
exports.receiveAllMessages = (req, res) => {
    console.log("Inside Message Controller: Get ALL Messages");

    MessageModel.receiveAllMessages((err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else if(result.length == 0){
            console.log("No Messages Exist");
            res.status(404).send("No Messages Exist");
        }
        else{
            console.log("Messages Retriived");
            console.log(result);
            res.status(200).send(result);
        }
    })
}



// Receive All messages between 2 users
exports.receiveChat = (req, res) => {
    console.log("Inside Message Controller: Get Messages between: " + 
    req.body.senderId + " and " + req.body.receiverId);

    MessageModel.receiveChat(req.body, (err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else if(result.length == 0){
            console.log("No Messages Exist");
            res.status(404).send("No Messages Exist");
        }
        else{
            console.log("Messages Retriived");
            console.log(result);
            res.status(200).send(result);
        }
    })
}
