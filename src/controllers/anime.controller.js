const AnimeService = require('../services/anime.service');

const AnimeController = {}

AnimeController.createOne = (req, res, next) => {
    const image = req.body.image;
    const imagebg = req.body.imagebg;
    if(image == undefined || imagebg == undefined){
        return res.status(400).json({status: "Failed", message: "Missing image"});
    }
    const data = {
        name: req.body.name,
        othername: req.body.othername,
        content: req.body.content,
        year: req.body.year,
        image,
        imagebg
    }
    AnimeService.createOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

AnimeController.updateOne = (req, res, next) => {
    let data = req.body.data;
    const id = req.params.id;
    AnimeService.updateOne(data, id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

AnimeController.getAll = (req, res, next) => {
    AnimeService.getAll()
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

AnimeController.getInformation = (req, res, next) => {
    const id = req.params.id;
    AnimeService.getInformation(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

AnimeController.deleteSoft = (req, res, next) => {
    const id = req.params.id;
    AnimeService.deleteSoft(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

AnimeController.activateOne = (req, res, next) => {
    const id = req.params.id;
    AnimeService.activateOne(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

AnimeController.addGenre = (req, res, next) => {
    const data = {
        idAnime: req.body.anime,
        idGenre: req.body.genre,
    }
    AnimeService.addGenre(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

AnimeController.deleteGenre = (req, res, next) => {
    const data = {
        idGA: req.body.idGA,
        idAnime: req.body.idAnime
    }
    AnimeService.deleteGenre(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

module.exports = AnimeController;