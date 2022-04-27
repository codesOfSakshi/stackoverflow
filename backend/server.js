const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const config = require("config");
const user = require("./controllers/user");

const app = express();

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const mongo_url = "mongodb+srv://root:atlasalpha098@cluster0.g9k9g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongo_url, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


app.use(cors());
app.use(express.json());


app.use('/api/user',user);


app.listen(config.get("BACKEND_SERVER_PORT"), console.log(`Server running on port ${config.get("BACKEND_SERVER_PORT")}`))
