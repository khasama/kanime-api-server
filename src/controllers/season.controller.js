const SeasonService = require('../services/season.service');

const SeasonController = {}

SeasonController.getAnimeSeason = (req, res, next) => {
    const id = req.params.id;
    if(id){
        SeasonService.getAnimeSeason(id)
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

SeasonController.addSeason = async (req, res, next) => {
    const idAnime = req.body.idAnime;
    const idSeries = req.body.idSeries;
    const season = req.body.season;
    if(idAnime && idSeries && season){
        const data = {
            idAnime,
            idSeries,
            season
        }
        SeasonService.addSeason(data)
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

SeasonController.deleteSeason = async (req, res, next) => {
    const id =  req.params.id;
    if(id){
        SeasonService.deleteSeason(id)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
        })
    }else{
        return res.status(400).json({status: "Failed", message: "Missing params"});
    }
}

module.exports = SeasonController;