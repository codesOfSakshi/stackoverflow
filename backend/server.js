const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const config = require("config");
const user = require("./controllers/user");

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb+srv://admin:admin@etsy.p9dvg.mongodb.net/etsy?retryWrites=true&w=majority",
    {
        maxpoolSize: 10,
    }
)
.then(
    () => {
        app.listen(config.get("BACKEND_SERVER_PORT"), console.log(`Server running on port ${config.get("BACKEND_SERVER_PORT")}`))

    },
    (err) => {
        console.log("Mongoose is Not Connected"+ err);
    }
);

app.use(cors());
app.use(express.json());

app.use('/api/user',user);


