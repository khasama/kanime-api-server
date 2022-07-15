const SeriesService = require("../services/series.service");

const SeriesController = {};

SeriesController.getAll = (req, res, next) => {
    SeriesService.getAll()
        .then((rs) => {
            return res.status(200).json(rs);
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        });
};

SeriesController.createOne = (req, res, next) => {
    const series = req.body.series;
    if (series) {
        const data = { series };
        SeriesService.createOne(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

SeriesController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const series = req.body.series;
    if (id && series) {
        const data = {
            id,
            series,
        };
        SeriesService.updateOne(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

SeriesController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        SeriesService.deleteOne(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

SeriesController.getASS = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        SeriesService.getASS(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

module.exports = SeriesController;
