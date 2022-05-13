const USERMODEL = require("../models/user");
const QUESITONMODEL = require("../models/question");
const ANSWERMODEL = require("../models/answer");
const mongoose = require("mongoose");

module.exports = class SearchService {
  /**
   *
   * This method searches for a particular tag in the question collection and returns a list of those questions
   * It will get all the questions from the database and return the ones that have the tag AND
   * It will return all the questions or the answers where title or description or comments where the searchString is a substring of them
   * @param keyword, searchString
   * @returns list of questions or null if there is an error
   */
  static async searchByTag({ keyword, searchString }) {
    try {
      const questions = await QUESITONMODEL.find().populate("answers").lean();
      // if questions is null or undefined, return null
      if (questions == null) {
        return null;
      }
      let final_ans = [];
      for (const question of questions) {
        const index = question.tags.findIndex((tag) => {
          return tag.toString().toLowerCase() === keyword.toLowerCase();
        });
        if (index < 0) {
          continue;
        }

        if (question.status && question.status == "pending") {
          continue;
        }

        if (
          question.title.toLowerCase().includes(searchString.toLowerCase()) ||
          question.description
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          question.tags
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          final_ans.push(question);
          continue;
        }

        for (let answer of question.answers) {
          if (
            answer.comment.toLowerCase().includes(searchString.toLowerCase()) ||
            answer.description
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            final_ans.push(question);
            break;
          }
        }
      }

      return final_ans;
    } catch (error) {
      console.log(
        "There was an error in search service searchByTag and the error is:- \n",
        error
      );
      return null;
    }
  }

  static async searchByUser({ keyword, searchString }) {
    try {
      const questions = await QUESITONMODEL.find().populate("answers").lean();
      // if questions is null or undefined, return null
      if (questions == null) {
        return null;
      }
      let final_ans = [];
      for (const question of questions) {
        if (
          question.userId.toString().toLowerCase() !==
          keyword.toString().toLowerCase()
        ) {
          continue;
        }

        if (question.status && question.status == "pending") {
          continue;
        }

        if (
          question.title.toLowerCase().includes(searchString.toLowerCase()) ||
          question.description
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          question.tags
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          final_ans.push(question);
          continue;
        }

        for (let answer of question.answers) {
          if (
            answer.comment.toLowerCase().includes(searchString.toLowerCase()) ||
            answer.description
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            final_ans.push(question);
            break;
          }
        }
      }

      return final_ans;
    } catch (error) {
      console.log(
        "There was an error in search service searchByUser and the error is",
        error
      );
      return null;
    }
  }

  static async searchExactPhrase({ searchString }) {
    try {
      const questions = await QUESITONMODEL.find().populate("answers").lean();
      // if questions is null or undefined, return null
      if (questions == null) {
        return null;
      }
      let final_ans = [];

      for (const question of questions) {
        if (question.status && question.status == "pending") {
          continue;
        }

        if (
          question.title.toLowerCase().includes(searchString.toLowerCase()) ||
          question.description
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          question.tags
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          final_ans.push(question);
          continue;
        }

        for (let answer of question.answers) {
          if (
            answer.comment.toLowerCase().includes(searchString.toLowerCase()) ||
            answer.description
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            final_ans.push(question);
            break;
          }
        }
      }
      return final_ans;
    } catch (error) {
      console.log(
        "There was an error in search service searchExactPhrase and the error is",
        error
      );
      return null;
    }
  }

  static async searchQuestion({ searchString }) {
    console.log("here too");
    // const query = {
    //   $or: [
    //     {
    //       title: { $regex: searchString, $options: "i" },
    //     },
    //     {
    //       tags: { $regex: searchString, $options: "i" },
    //     },
    //     {
    //       description: { $regex: searchString, $options: "i" },
    //     },
    //     {
    //       answers: { $regex: searchString, $options: "i" },
    //     },
    //   ],
    // };

    const query = {
      $and: [
        {
          $or: [
            {
              title: { $regex: searchString, $options: "i" },
            },
            {
              tags: { $regex: searchString, $options: "i" },
            },
            {
              description: { $regex: searchString, $options: "i" },
            },
            {
              answers: { $regex: searchString, $options: "i" },
            },
          ],
        },
        { status: { $ne: "pending" } },
      ],
    };

    try {
      const questions = await QUESITONMODEL.find(query)
        .populate("answers")
        .lean();
      if (questions) {
        return questions;
      } else {
        return null;
      }
    } catch (error) {
      console.log(
        "There was an error in search service searchQuestion and the error is",
        error
      );
      return null;
    }
  }

  static async searchAnswer({ searchString }) {
    try {
      const questions = await QUESITONMODEL.find().populate("answers").lean();
      // if questions is null or undefined, return null
      if (questions == null) {
        return null;
      }
      let final_ans = [];
      for (const question of questions) {
        if (question.status && question.status == "pending") {
          continue;
        }

        for (let answer of question.answers) {
          if (
            answer.comment.toLowerCase().includes(searchString.toLowerCase()) ||
            answer.description
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            final_ans.push(question);
            break;
          }
        }
      }

      return final_ans;
    } catch (error) {
      console.log(
        "There was an error in search service searchAnswer and the error is",
        error
      );
      return null;
    }
  }

  static async searchStatus({ keyword, searchString }) {
    try {
      const questions = await QUESITONMODEL.find().populate("answers").lean();
      // if questions is null or undefined, return null
      if (questions == null) {
        return null;
      }
      let final_ans = [];
      for (const question of questions) {
        if (question.status && question.status == "pending") {
          continue;
        }
        if (
          question.status.toString().toLowerCase() !==
          keyword.toString().toLowerCase()
        ) {
          continue;
        }
        if (
          question.title.toLowerCase().includes(searchString.toLowerCase()) ||
          question.description
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          question.tags
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          final_ans.push(question);
          continue;
        }

        for (let answer of question.answers) {
          if (
            answer.comment.toLowerCase().includes(searchString.toLowerCase()) ||
            answer.description
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            final_ans.push(question);
            break;
          }
        }
      }

      return final_ans;
    } catch (error) {
      console.log(
        "There was an error in search service searchStatus and the error is",
        error
      );
      return null;
    }
  }

  static async searchUsersByName({ name }) {
    try {
      const query = {};
      if (name !== "") {
        query.name = { $regex: `^${name}`, $options: "i" };
      }

      const users = await USERMODEL.find(query);
      if (users) {
        return users;
      } else {
        return null;
      }
    } catch (error) {
      console.log(
        "There was an error in SearchService.searchUsersByName and the error is \n",
        error
      );
      return null;
    }
  }


  // static async searchNested(parsedData) {
  //   try {

  //   console.log("here")
  //   // const questions = await QUESITONMODEL.find()
  //   var query="{\"$and\":["
  //   // var parsedData={
  //   //   tags:["JAVA","PYTHON"],
  //   //   phrases:["REACTS"],
  //   //   user:"",
  //   //   accepted:true,
  //   // }

  //   console.log("parsedData")
  //   for (var i=0;i<parsedData.tags.length;i++){
  //     if(i!=0){
  //       query+=","
  //     }
  //     var tag="{\"tags\":\""+parsedData.tags[i]+"\"}"
  //     query+=tag
  //   }

  //   if(parsedData.user){
  //     query+=","
  //     var user="{\"user\":\""+parsedData.user+"\"}"
  //     query+=user
  //   }

  //   if(parsedData.accepted===false){
  //     query+=","
  //     var user="{\"status\":\""+"PENDING"+"\"}"
  //     query+=user
  //   }
  //   else{
  //     query+=","
  //     var user="{\"status\":\""+"APPROVED"+"\"}"
  //     query+=user
  //   }

  //   query+="]}"
  //   console.log(query)


  //   if(parsedData.phrases.length>=1){
  //     var phrasesQuery="{\"$text\":{\"$search\":\""
      
  //     for (var i=0;i<parsedData.phrases.length;i++){
  //       var phrase="\\\""+parsedData.phrases[i]+"\\\""
  //       phrasesQuery+=phrase
  //     }
  //     phrasesQuery+="\"}}"

  //     var answerPhraseQuery={}
  //     for (var i=0;i<parsedData.phrases.length;i++){
  //       var phrase="{\"description\":"+new RegExp(parsedData.phrases[i])+"i}"
  //       answerPhraseQuery.description=new RegExp(parsedData.phrases[i])
  //     }
  //     console.log("Query running in answers model : ",answerPhraseQuery)
  //     const answers = await ANSWERMODEL.find(answerPhraseQuery).select("_id")
  //     console.log("Answers returned with same description : ",answers)


  //     var ansArray=[]
  //     answers.map(
  //       answer=>{
  //         ansArray.push(mongoose.Types.ObjectId(answer._id))
  //       })

  //     const answerQuery="{\"answers\":{\"$in\":"+JSON.stringify(ansArray)+"}}"

  //     //Only questions
  //     if(parsedData.question!==undefined && parsedData.question===true){
  //       query=JSON.parse(query)
  //       console.log(query)
  //       query.$and.push(JSON.parse(phrasesQuery))
  //     }
  //     //Only answers
  //     else if (parsedData.answer!==undefined && parsedData.answer===true){
  //       console.log("Running only for answers")
  //       query=JSON.parse(query)
  //       query.$and.answers={}
  //       query.$and.answers.$in=ansArray
  //     }
  //     //Or Questions or Answers
  //     else{
  //       query=JSON.parse(query)
  //       query.$and.$or=[]
  //       query.$and.$or.push(JSON.parse(phrasesQuery))
  //       query.$and.$or.answers={}
  //       query.$and.$or.answers.$in=ansArray
  //     }
  //   }
  //   console.log("Final Query :",query)
  //   if(typeof query==="string"){
  //     query=JSON.parse(query)
  //   }

  //   const questions = await QUESITONMODEL.find(query)
  //   console.log("Query end here",query,questions)
  //   return questions
  // } 
  // catch (error) {
  //   console.log(
  //     "There was an error in SearchService.searchUsersByName and the error is \n",
  //     error
  //   );
  //   return null;
  // }

  static async searchNested(parsedData) {
    try {

    console.log("here")
    // const questions = await QUESITONMODEL.find()
    var query={}
    query.$and=[]

    console.log("parsedData")
    for (var i=0;i<parsedData.tags.length;i++){
      var queryTag={}
      queryTag.tags=parsedData.tags[i]
      query.$and.push(queryTag)
    }

    if(parsedData.user){
      var queryTag={}
      queryTag.user=parsedData.user
      query.$and.push(queryTag)
    }

    if(parsedData.accepted===false){
      var queryTag={}
      queryTag.status="PENDING"
      query.$and.push(queryTag)
    }
    else{
      var queryTag={}
      queryTag.status="APPROVED"
      query.$and.push(queryTag)
    }


    if(parsedData.phrases.length>=1){
      var phrasesQuery={}
      phrasesQuery.$and=[]
      for (var i=0;i<parsedData.phrases.length;i++){
        phrasesQuery.$and.push({description:new RegExp(parsedData.phrases[i],"i")})
      }

      //Only questions
      if(parsedData.question!==undefined && parsedData.question===true){
        // console.log(JSON.stringify(query))
        console.log("phrasesQuery",phrasesQuery)
        query.$and.push(phrasesQuery)
      }
      //Only answers
      else{
          var answerPhraseQuery={}
          answerPhraseQuery.$and=[]
          for (var i=0;i<parsedData.phrases.length;i++){
            answerPhraseQuery.$and.push({description:new RegExp(parsedData.phrases[i],"i")})
          }
          console.log("Query running in answers model : ",answerPhraseQuery)
          const answersList = await ANSWERMODEL.find(answerPhraseQuery).distinct('_id')
          console.log("Answers returned with same description : ",answersList)


        var ansArray=[]

          if (parsedData.answer!==undefined && parsedData.answer===true){
            console.log("Running only for answers")
            let answers={}
            answers.$in=answersList
            console.log("answersOnly",answers)
            query.$and.push({answers})
          }
          //Or Questions or Answers
          else{
            console.log("Running for questions and answers")
            
            var mixQuery=[]
            let answers={}
            answers.$in=answersList
            mixQuery.push({answers})
            mixQuery.push(phrasesQuery)
            console.log("Answers query : ",{answers})
            console.log("Answers query : ",phrasesQuery)
            var $or={}
            $or=mixQuery
            console.log("Orquery: ",{$or})
            query.$and.push({$or})
          }
      }
    }
    console.log("Answer Query",answerPhraseQuery)
    console.log("Answer Array",ansArray)
    console.log("Final Query :",query)
    
    const questions = await QUESITONMODEL.find(query)

    return questions
  } 
  catch (error) {
    console.log(
      "There was an error in SearchService.searchUsersByName and the error is \n",
      error
    );
    return null;
  }


}}
