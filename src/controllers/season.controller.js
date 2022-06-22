const SeasonService = require('../services/season.service');

const SeasonController = {}

SeasonController.getAll = async (req, res, next) => {
    try {
        const rs = await SeriesService.getAll();
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

SeasonController.createOne = async (req, res, next) => {
    try {
        const data = {series: req.body.series};
        const rs = await SeriesService.createOne(data);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

SeasonController.updateOne = async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            series: req.body.series
        };
        const rs = await SeriesService.updateOne(data);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

SeasonController.deleteOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const rs = await SeriesService.deleteOne(id);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

SeasonController.getASS = async (req, res, next) => {
    const id = req.params.id
    try {
        const rs = await SeriesService.getASS(id);
        return res.status(200).json(rs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed", error: "Has a fucking error"});
    }
}

module.exports = SeasonController;