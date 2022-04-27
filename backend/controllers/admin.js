const ADMIN = require("../services/admin");
const CONSTANTS =  require("../config/constants.json");

module.exports = class AdminController{
    static async test(req, res){
        console.log("INSIDE TEST");
        try{
            const response = await ADMIN.test();
            //console.log(response);
        res.send(response);
        res.status(201);
        res.end();
        }
        catch(err){
            res.message = "Something went wrong: "+ err;
            res.status(500);
            res.end();
        }
    }

    static async approve(req, res){
        console.log("INSIDE APPROVE");
        const {questionID, status} = req.body;
        try{
            if(questionID && (status.toLowerCase() == CONSTANTS.constants.questionAccepted || status.toLowerCase() == CONSTANTS.constants.questionRejected)){
                const response = await ADMIN.approve({questionID, status});
            //console.log(response);
        res.send(response);
        res.status(200);
        res.end();
            }
            res.send("Expected questionID and status: "+CONSTANTS.constants.questionRejected+ " or "+ CONSTANTS.constants.questionAccepted);
            res.send(400)
            res.end();
        }
        catch(err){
            res.message = "Something went wrong: "+ err;
            res.status(500);
            res.end();
        }
    }

    static async getAnalytics(req, res){
        console.log("INSIDE GET ANALYTICS");
        const response ={};
        try{
            response.TotalQuestions = await ADMIN.getCountOfTodaysQuestions();
            response.QuestionIds = await ADMIN.getMostViewedQuestions();
            response.Tags = await ADMIN.getMostUsedTags();
            response.HighestReputationUsers = await ADMIN.getHighestedRepUsers();
            response.LowestReputationUsers = await ADMIN.getLowestRepUsers();
            //console.log(response);
        res.send(response);
        res.status(200);
        res.end();
        }
        catch(err){
            res.send("Something went wrong: "+ err);
            res.status(500);
            res.end();
        }
    }
    
}

