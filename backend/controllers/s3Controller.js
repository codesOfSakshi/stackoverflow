const s3service = require('../services/s3service');

// Get All Tags
exports.uploadImage = (req, res) => {
    console.log("Inside s3 Controller:");
    const response = {}
    s3service.imageUpload((err, result) => {
        if(err)
        {
            console.log(err);
            res.status(400).send(err);
        }
        else{
            console.log("Image uploaded:");
            console.log(result);
            if(result){

                response.data = result;
                res.status(200).send(response);
            }
        }
    })
}