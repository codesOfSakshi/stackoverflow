const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const db = require('./config/mysql.config')

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
app.use(express.json());

// Tag Routes
const tagRoutes = require('./routes/tag.route');
app.use('/api/tags/', tagRoutes);

// Message Routes
const messsageRoutes = require('./routes/message.route');
app.use('/api/messages/', messsageRoutes);


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

// const express = require("express");
// const cors = require('cors');
// const mongoose = require('mongoose');
// const config = require("config");
// const user = require("./controllers/user");
// const tagRoutes = require('./routes/tag.route');

// const app = express();

// mongoose.Promise = global.Promise;

// mongoose.connect(
//     "mongodb+srv://admin:admin@etsy.p9dvg.mongodb.net/etsy?retryWrites=true&w=majority",
//     {
//         maxpoolSize: 10,
//     }
// )
// .then(
//     () => {
//         app.listen(config.get("BACKEND_SERVER_PORT"), console.log(`Server running on port ${config.get("BACKEND_SERVER_PORT")}`))

//     },
//     (err) => {
//         console.log("Mongoose is Not Connected"+ err);
//     }
// );

// app.use(cors());
// app.use(express.json());

// app.use('/api/user',user);
// app.use('/api/tags/', tagRoutes);