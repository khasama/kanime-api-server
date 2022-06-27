const AnimeService = require('../services/anime.service');
const fs = require('fs');

const AnimeController = {}

AnimeController.createOne = async (req, res, next) => {
    const image = req.body.image;
    const imagebg = req.body.imagebg;
    if(image == undefined || imagebg == undefined){
        return res.status(400).json({message: "Failed", error: "Missing image"});
    }
    try {
        const data = {
            name: req.body.name,
            othername: req.body.othername,
            content: req.body.content,
            year: req.body.year,
            image: req.body.image,
            imagebg: req.body.imagebg
        }
        const rs = await AnimeService.createOne(data);
        return res.status(200).json(rs);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

AnimeController.updateOne = async (req, res, next) => {
    let data = req.body.data;
    const id = req.params.id;
    try {
        const rs = await AnimeService.updateOne(data, id);
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
AnimeController.deleteGenre = async (req, res, next) => {
    const data = {
        idGA: req.body.idGA,
        idAnime: req.body.idAnime
    }
    try {
        const rs = await (AnimeService.deleteGenre(data));
        return res.status(200).json(rs);
    } catch (err) {
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

module.exports = AnimeController;