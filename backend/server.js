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

mongoose.connect(config.get("MONGODB_SERVER")+config.get("MONGODB_DB"), options, (err, res) => {
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
