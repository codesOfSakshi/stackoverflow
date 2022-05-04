const express = require("express");
const router = express.Router();

router.post("/",  async (req, res) => {
    const voteType = req.body.voteType;
    const questionId = req.body.questionId;
    const answerId = req.body.answerId;
    const comment = req.body.comment;
    const voter = req.body.voter;
    const type = req.body.type;
    const response = {};
    try{
        const addVote = await Vote.postVote(voteType,questionId,answerId,type,comment,voter);
        if(addVote?.length){
            response.success = true;
            response.questionId = questionId;
            response.answerId = answerId;
            response.comment = comment;
            response.status = 200;
            res.status(200).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});

module.exports = router;