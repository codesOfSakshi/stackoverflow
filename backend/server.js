const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
app.use(express.json());

// Tag Routes
const tagRoutes = require('./routes/tag.route');
app.use('/api/tags/', tagRoutes);



app.get("/",(req,res)=>{
    res.send("API is running!")
});

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
    //"mongodb+srv://admin:admin@etsy.p9dvg.mongodb.net/etsy?retryWrites=true&w=majority",
    "mongodb+srv://parmeet:5Z1emt6qRzhFkdHI@cluster-273lab.aik5z.mongodb.net/273Lab?retryWrites=true&w=majority",
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

//app.listen(5000, console.log("Server running on port 5000"))
