import {QuestionSchema} from "../db/mongoModels/question.js";

const questioner = async (req, res) => {
  try{
    questions = await QuestionSchema.find({})
    if(questions?.length){
        res(questions);
      }else{
        res([]);
      }
  }catch(err){
      console.log(err);
      throw new Error("Some unexpected error occurred while getting "+type+" questions");
  }
}

export default questioner;