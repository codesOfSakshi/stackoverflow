const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require("./routes/admin");



var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(
    "mongodb+srv://admin:admin@etsy.p9dvg.mongodb.net/etsy?retryWrites=true&w=majority",
    options
)
.then(
    () => {
        console.log("Connected to MongoDB");
    },
    (err) => {
        console.log("Mongoose is Not Connected"+ err);
    }
);

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, console.log("Server running on port 5000"))

app.use("/api/admin", admin);