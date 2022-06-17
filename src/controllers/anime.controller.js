const AnimeService = require('../services/anime.service');

const AnimeController = {}

AnimeController.createOne = async (req, res, next) => {
    const files = req.files;
    if(files == null || files.image == undefined || files.imagebg == undefined){
        return res.status(400).json({message: 'Failed', error: 'Missing Image'});
    }
    const typeImage = files.image.mimetype.split("/")[1];
    const typeImageBG = files.imagebg.mimetype.split("/")[1];
    if(
        typeImage == "jpg" || typeImage === "png" || typeImage === "jpeg" || typeImage === "webp" ||
        typeImageBG === "jpg" || typeImageBG === "png" || typeImageBG === "jpeg" || typeImageBG === "webp"
    ){
        try {
            const data = {
                name: req.body.name,
                othername: req.body.othername,
                content: req.body.content,
                year: req.body.year,
                image: files.image,
                imagebg: files.imagebg
            }
            const rs = await AnimeService.createOne(data);
            return res.status(200).json({message: 'Success', rs});
            // console.log(req.files.imagebg);
            // return res.json(req.files.imagebg);
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: 'Failed', error: 'Has a fucking error'});
        }
    }

    return res.status(400).json({message: 'Failed', error: 'Only image'});

    

}

AnimeController.getAll = async (req, res, next) => {
    try {
        const data = await (AnimeService.getAll());
        return res.status(200).json({message: 'Success', data});
    } catch (err) {
        return res.status(500).json({message: 'Failed', error: 'Has a fucking error'});
    }
}
AnimeController.getInformation = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await (AnimeService.getInformation(id));
        return res.status(200).json({message: 'Success', data});
    } catch (err) {
        return res.status(500).json({message: 'Failed', error: 'Has a fucking error'});
    }

}
AnimeController.updateOne = (req, res, next) => {

}
AnimeController.deleteSoft = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await (AnimeService.deleteSoft(id));
        return res.status(200).json({message: 'Success', data});
    } catch (err) {
        return res.status(500).json({message: 'Failed', error: 'Has a fucking error'});
    }
}
AnimeController.activateOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await (AnimeService.activateOne(id));
        return res.status(200).json({message: 'Success', data});
    } catch (err) {
        return res.status(500).json({message: 'Failed', error: 'Has a fucking error'});
    }
}

module.exports = AnimeController;