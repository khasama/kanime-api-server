const EpisodeService = require('../services/episode.service');

const EpisodeController = {}

EpisodeController.getEp =  (req, res, next) => {
    const data = {
        idAnime: req.params.idAnime,
        idServer: req.params.idServer
    }
    EpisodeService.getEp(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    });
}

EpisodeController.updateOne =  (req, res, next) => {
    const data = {
        idEpisode: req.params.id,
        link: req.body.link
    }
    EpisodeService.updateOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    });
}

EpisodeController.getFullUrl =  (req, res, next) => {
    const data = {
        idAnime: req.params.idAnime,
        episode: req.params.episode
    }
    EpisodeService.getFullUrl(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    });
}

EpisodeController.addEP =  (req, res, next) => {
    const data = {
        anime: req.body.anime,
        server: req.body.server,
        episode: req.body.episode,
        link: req.body.link
    }
    EpisodeService.addEP(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    });
}

EpisodeController.deleteEp =  (req, res, next) => {
    const id  = req.params.id;
    EpisodeService.deleteEp(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    });
}

EpisodeController.getLink =  (req, res, next) => {
    const id  = req.params.id;
    EpisodeService.getLink(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    });
}

module.exports = EpisodeController;
