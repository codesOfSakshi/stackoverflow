const express = require("express");
const router = express.Router();

router.get("/bookmark/:userId",  async (req, res) => {
    const id = req.params.userId;
    const user = {userId};
    const response = {};
    try{
        const questionIds = await User.getBookMarkQuestionIds(user);
        if(questionIds?.length){
            const questions = await Question.getQuestions(questionIds);
            if(questions?.length){
                response.success = true;
                response.bookMarkQuestions = questions;
                response.status = 200;
                res.status(200).send(response);
            }else{
                response.success = true;
                response.bookMarkQuestions = [];
                response.status = 200;
                res.status(200).send(response);
            }
        }else{
            response.success = true;
            response.bookMarkQuestions = [];
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