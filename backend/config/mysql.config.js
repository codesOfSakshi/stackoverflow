const mysql = require('mysql');

// DB Setup
const db = mysql.createConnection({
    user:'admin',
    host:'db-stackoverflow.cnhf2ck6mcsk.us-west-1.rds.amazonaws.com',
    password:'272project',
    database:'project272'
})

db.connect(function(err){
    if(err){
        throw err;
    }
    console.log("Database Connected");
})

module.exports = db;