const YearService = require('../services/year.service');

const YearController = {}

YearController.getAll = (req, res , next) => {
    YearService.getAll()
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

YearController.createOne = (req, res , next) => {
    const data = {year: req.body.year};
    YearService.createOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

YearController.updateOne = (req, res , next) => {
    const data = {
        id: req.params.id,
        year: req.body.year
    }
    YearService.updateOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

YearController.deleteOne = (req, res , next) => {
    const id = req.params.id
    YearService.deleteOne(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

module.exports = YearController;