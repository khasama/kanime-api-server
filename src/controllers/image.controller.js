const { getFile } = require('../utils/');

const ImageController = {}

ImageController.getAnimeImage = (req, res, next) => {
    const key = req.params.key;
    const readStream = getFile(key);
    readStream.on('error', (err) => {
        return res.status(err.statusCode).json({message: err.message});
    }).pipe(res);  
}

module.exports = ImageController;