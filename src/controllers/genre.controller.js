const GenreService = require('../services/genre.service');

const GenreController = {}

GenreController.getAll = (req, res, next) => {
    GenreService.getAll()
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

GenreController.createOne = (req, res, next) => {
    const data = {genre: req.body.genre};
    GenreService.createOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

GenreController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    GenreService.deleteOne(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

GenreController.getAAOG = (req, res, next) => {
    const id = req.params.id;
    GenreService.getAAOG(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

GenreController.getInformation = (req, res, next) => {
    const id = req.params.id;
    GenreService.getInformation(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

GenreController.updateOne = (req, res, next) => {
    const data = {
        id: req.params.id,
        genre: req.body.genre
    }
    GenreService.updateOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

module.exports = GenreController;