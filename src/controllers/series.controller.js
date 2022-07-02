const SeriesService = require('../services/series.service');

const SeriesController = {}

SeriesController.getAll = (req, res, next) => {

    SeriesService.getAll()
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

SeriesController.createOne = (req, res, next) => {
    const data = {series: req.body.series};
    SeriesService.createOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

SeriesController.updateOne = (req, res, next) => {
    const data = {
        id: req.params.id,
        series: req.body.series
    };
    SeriesService.updateOne(data)
    .then(rs => {   
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

SeriesController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    SeriesService.deleteOne(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

SeriesController.getASS = (req, res, next) => {
    const id = req.params.id;
    SeriesService.getASS(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    });
}

module.exports = SeriesController;