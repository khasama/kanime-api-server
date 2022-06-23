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

module.exports = EpisodeController;
