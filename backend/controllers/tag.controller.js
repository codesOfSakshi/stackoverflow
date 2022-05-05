const TagService = require('../services/tag.service');

// Get All Tags
exports.getAllTags = (req, res) => {
    console.log("Inside Tags Controller: Get All Tags");

    TagService.getAllTags((err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else{
            console.log("All Tags:");
            console.log(result);
            res.status(200).send(result);
        }
    })
}


// Get All Tags
exports.getTaggedQuestions = (req, res) => {
    console.log("Inside Tags Controller: Get Questions for: ", req.body.tagId);

    TagService.getTaggedQuestions(req.body, (err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else if(result.status == false){
            console.log("No questions tagged with: ", req.body.tagId)
            res.status(404).send(result);
        }
        else{
            console.log("Tagged Questions for: ", req.body.tagId);
            console.log(result);
            res.status(200).send(result);
        }
    })
}


// Update Tag numQuestions
exports.updateNumQuestions = (req, res) => {
    console.log("Inside Tags Controller: Update Num Questions: ", req.params.tagId);

    TagService.updateNumQuestions(req.params.tagId, (err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else{
            console.log("Tag NumQuestions Updated");
            console.log(result);
            res.status(200).send(result);
        }
    })
}


// Get Tag by Name (Search)
exports.searchTags = (req, res) => {
    console.log("Inside Tags Controller: Search Tag: ", req.params.name);

    TagService.searchTags(req.params.name, (err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else if(result == null){
            res.status(404).send("No such tag exists")
        }
        else{
            console.log("Query results")
            console.log(result);
            res.status(200).send(result);
        }
    })
}


// Add Tag (Admin only)
exports.createTag = (req, res) => {
    console.log("Inside Tags Controller: Create Tag");

    TagService.createTag(req.body, (err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else if(result.status == true){
            console.log("Tag Created")
            console.log(result);
            res.status(200).send(result);
        }
        else{
            res.status(404).send("Tag Already exists");
        }
    })
}


//tag to badge
exports.tagToBadge = (req,res) =>{
    console.log("Inside Tag ot Badge Calculator")
    TagService.findBadge(req.body, (err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else if(result.status == true){
            console.log("Tag Created")
            console.log(result);
            res.status(200).send(result);
        }
        else{
            res.status(404).send("Tag Already exists");
        }
    })
}