const { getFile } = require('../utils/');

const ImageController = {}

ImageController.getAnimeImage = (req, res, next) => {
    const key = req.params.key;
    const readStream = getFile(key);
    readStream.pipe(res);
}

module.exports = ImageController;