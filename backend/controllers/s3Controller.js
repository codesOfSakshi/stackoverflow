const s3service = require('../services/s3service');

// Get All Tags
exports.uploadImage = (req, res) => {
    console.log("Inside Tags Controller: Get All Tags");

    s3service.imageUpload((err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else{
            console.log("Image uploaded:");
            console.log(result);
            res.status(200).send(result);
        }
    })
}