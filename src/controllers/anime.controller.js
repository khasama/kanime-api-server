const AnimeService = require('../services/anime.service');

const AnimeController = {}

AnimeController.createOne = async (req, res, next) => {
    const files = req.files;
    if(files == null || files.image == undefined || files.imagebg == undefined){
        return res.status(400).json({message: "Failed", error: "Missing image"});
    }
    try {
        const data = {
            name: req.body.name,
            othername: req.body.othername,
            content: req.body.content,
            year: req.body.year
        }
        const rs = await AnimeService.createOne(data, files);
        return res.status(200).json(rs);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

AnimeController.updateOne = async (req, res, next) => {
    const files = req.files;
    try {
        const data = {
            name: req.body.name,
            othername: req.body.othername,
            content: req.body.content,
            year: req.body.year,
            view: req.body.view,
            liked: req.body.liked,
            mainserver: req.body.mainserver,
            status: req.body.status,
            image: req.body.image,
            imagebg: req.body.imagebg,
            id: req.params.id
        }
        const rs = await AnimeService.updateOne(data, files);
        return res.status(200).json(rs);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

AnimeController.getAll = async (req, res, next) => {
    try {
        const rs = await (AnimeService.getAll());
        return res.status(200).json(rs);
    } catch (err) {
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

AnimeController.getInformation = async (req, res, next) => {
    const id = req.params.id;
    try {
        const rs = await (AnimeService.getInformation(id));
        return res.status(200).json(rs);
    } catch (err) {
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }

}

AnimeController.deleteSoft = async (req, res, next) => {
    const id = req.params.id;
    try {
        const rs = await (AnimeService.deleteSoft(id));
        return res.status(200).json(rs);
    } catch (err) {
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

AnimeController.activateOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const rs = await (AnimeService.activateOne(id));
        return res.status(200).json(rs);
    } catch (err) {
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

AnimeController.addGenre = async (req, res, next) => {
    const data = {
        idAnime: req.body.anime,
        idGenre: req.body.genre,
    }
    try {
        const rs = await (AnimeService.addGenre(data));
        return res.status(200).json(rs);
    } catch (err) {
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

module.exports = AnimeController;