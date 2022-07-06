const EpisodeService = require('../services/episode.service');

const EpisodeController = {}

EpisodeController.getEp =  (req, res, next) => {
    const idAnime = req.params.idAnime;
    const idServer = req.params.idServer;
    if(idAnime && idServer){
        const data = {
            idAnime,
            idServer
        }
        EpisodeService.getEp(data)
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

EpisodeController.updateOne =  (req, res, next) => {
    const idEpisode = req.params.id;
    const link = req.body.link;
    if(idEpisode && link){
        const data = {
            idEpisode,
            link
        }
        EpisodeService.updateOne(data)
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

EpisodeController.getFullUrl =  (req, res, next) => {
    const idAnime = req.params.idAnime;
    const episode = req.params.episode;
    if(idAnime && episode){
        const data = {
            idAnime,
            episode
        }
        EpisodeService.getFullUrl(data)
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

EpisodeController.addEP =  (req, res, next) => {
    const anime = req.body.anime;
    const server = req.body.server;
    const episode = req.body.episode;
    const link = req.body.link;
    if(anime && server && episode && link){
        const data = {
            anime,
            server,
            episode,
            link
        }
        EpisodeService.addEP(data)
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

EpisodeController.deleteEp =  (req, res, next) => {
    const id  = req.params.id;
    if(id){
        EpisodeService.deleteEp(id)
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

EpisodeController.getLink =  (req, res, next) => {
    const id  = req.params.id;
    if(id){
        EpisodeService.getLink(id)
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

module.exports = EpisodeController;
