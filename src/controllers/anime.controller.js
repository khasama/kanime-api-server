const AnimeService = require('../services/anime.service');

const AnimeController = {}

AnimeController.createOne = (req, res, next) => {
    const image = req.body.image;
    const imagebg = req.body.imagebg;
    const name = req.body.name;
    const othername = req.body.othername;
    const content = req.body.content;
    const year = req.body.year;

    if(image == undefined || imagebg == undefined){
        return res.status(400).json({status: "Failed", message: "Missing image"});
    }

    if(image && imagebg && name && othername && content && year){
        const data = {
            name,
            othername,
            content,
            year,
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
    }else{
        return res.status(400).json({status: "Failed", message: "Missing params"});
    }
    
}

AnimeController.updateOne = (req, res, next) => {
    const data = req.body.data;
    const id = req.params.id;
    if(id && data.name && data.othername && data.content && data.view 
        && data.liked && data.year && data.mainserver && data.status){

        AnimeService.updateOne(data, id)
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
    if(id){
        AnimeService.getInformation(id)
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

AnimeController.deleteSoft = (req, res, next) => {
    const id = req.params.id;
    if(id){
        AnimeService.deleteSoft(id)
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

AnimeController.activateOne = (req, res, next) => {
    const id = req.params.id;
    if(id){
        AnimeService.activateOne(id)
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

AnimeController.addGenre = (req, res, next) => {
    const idAnime = req.body.anime;
    const idGenre = req.body.genre;
    if(idAnime && idGenre){
        const data = {
            idAnime,
            idGenre,
        }
        AnimeService.addGenre(data)
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

AnimeController.deleteGenre = (req, res, next) => {
    const idGA = req.body.idGA;
    const idAnime = req.body.idAnime;
    if(idGA && idAnime){
        const data = {
            idGA,
            idAnime
        }
        AnimeService.deleteGenre(data)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        });
    }else{
        return res.status(400).json({status: "Error", message: "Missing params"});
    }
    
}

module.exports = AnimeController;