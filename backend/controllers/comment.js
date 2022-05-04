const express = require("express");
const router = express.Router();
const {Comment} = require("../services/comment");

router.post("/",  async (req, res) => {
    const questionId = req.body.questionId;
    const answerId = req.body.answerId;
    const comment = req.body.comment;
    const type = req.body.type;
    const response = {};
    try{
        const addComment = await Comment.postComment(answerId,questionId,type,comment);
        if(addComment){
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