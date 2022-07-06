const { getFile } = require('../utils/');

const ImageController = {}

ImageController.getAnimeImage = (req, res, next) => {
    const key = req.params.key;
    if(key != 'undefined'){
        const readStream = getFile(key);
        readStream.on('error', (err) => {
            return res.status(err.statusCode).json({message: err.message});
        }).pipe(res);  
    }else{
        return res.status(400).json({status: "Failed", message: "Missing params"});
    }
}

module.exports = ImageController;