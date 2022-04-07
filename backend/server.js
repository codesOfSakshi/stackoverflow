const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("API is running!")
});

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb+srv://admin:admin@etsy.p9dvg.mongodb.net/etsy?retryWrites=true&w=majority",
    {
        maxpoolSize: 10,
    }
)
.then(
    () => {
        app.listen(5000,console.log("Server Running on port 5000"));
    },
    (err) => {
        console.log("Mongoose is Not Connected"+ err);
    }
);

app.listen(5000, console.log("Server running on port 5000"))
