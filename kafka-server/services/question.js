import {Questions} from "../db/mongoModels/question.js";
import {Users} from "../db/mongoModels/user.js";

const questioner = async (req, res) => {
      console.log(req)
      var type=req.body.type;
      var sortType=req.body.sortType;
      try {
        const query = {
          status: "APPROVED",
        };
        console.log(type, sortType);
        var sorting = 1;
        var questions;
        if (sortType == "asc" || sortType == 1) {
          sorting = 1;
        }

        if (type == "Interesting" || type == 1) {
          console.log("here");
          // questions = await Questions.find({}).sort({createdAt: sorting})
          questions = await Questions.find(query)
          .populate("user")
          .sort({
            createdAt: -1,
          });
        } else if (type == "Hot" || type == 2) {
          questions = await Questions.find(query)
          .populate("user")
          .sort({ views: -1 });
        } else if (type == "Score" || type == 3) {
          questions = await Questions.find(query)
          .populate("user")
          .sort({ upVotes : -1 });
        } else if (type == "Unanswered" || type == 4) {
          questions = await Questions.find({
            answers: { $size: 0 },
            status: "APPROVED"
          })
          .populate("user")
          .sort({ score: 1 });
        }
        res(null,questions);
        // return questions
      } catch (err) {
        console.log(err);
        throw new Error("No question found with this Id");
      }
}

export default questioner;