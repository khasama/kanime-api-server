const SeasonService = require('../services/season.service');

const SeasonController = {}

SeasonController.getAnimeSeason = async (req, res, next) => {
    try {
        const id = req.params.id;
        const rs = await SeasonService.getAnimeSeason(id);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

SeasonController.addSeason = async (req, res, next) => {
    try {
        const data = {
            idAnime: req.body.idAnime,
            idSeries: req.body.idSeries,
            season: req.body.season
        }
        const rs = await SeasonService.addSeason(data);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

SeasonController.deleteSeason = async (req, res, next) => {
    try {
        const id = req.params.id
        const rs = await SeasonService.deleteSeason(id);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

module.exports = SeasonController;