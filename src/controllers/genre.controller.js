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
    const genre = req.body.genre;
    if(genre){
        const data = {genre}
        GenreService.createOne(data)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        });
    }else{
        return res.status(400).json({status: "Failed", message: "Missing params"});
    }
}

GenreController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if(id){
        GenreService.deleteOne(id)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        });
    }else{
        return res.status(400).json({status: "Failed", message: "Missing params"});
    }
}

GenreController.getAAOG = (req, res, next) => {
    const id = req.params.id;
    if(id){
        GenreService.getAAOG(id)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        });
    }else{
        return res.status(400).json({status: "Failed", message: "Missing params"});
    }
}

GenreController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if(id){
        GenreService.getInformation(id)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        });
    }else{
        return res.status(400).json({status: "Failed", message: "Missing params"});
    }
}

GenreController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const genre = req.body.genre;
    if(id && genre){
        const data = {
            id,
            genre
        }
        GenreService.updateOne(data)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        });
    }else{
        return res.status(400).json({status: "Failed", message: "Missing params"});
    }
}

module.exports = GenreController;