const GenreService = require('../services/genre.service');

const GenreController = {}

GenreController.getAll = async (req, res, next) => {
    try {
        const rs = await GenreService.getAll();
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

GenreController.createOne = async (req, res, next) => {
    try {
        const data = {genre: req.body.genre};
        const rs = await GenreService.createOne(data);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

GenreController.getAAOG = async (req, res, next) => {
    const id = req.params.id
    try {
        const rs = await GenreService.getAAOG(id);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

GenreController.getInformation = async (req, res, next) => {
    const id = req.params.id
    try {
        const rs = await GenreService.getInformation(id);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

module.exports = GenreController;