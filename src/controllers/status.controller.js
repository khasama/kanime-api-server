const StatusService = require('../services/status.service');

const StatusController = {}

StatusController.getAll = (req, res , next) => {
    StatusService.getAll()
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

StatusController.createOne = (req, res , next) => {
    const data = {status: req.body.status};
    StatusService.createOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

StatusController.updateOne = (req, res , next) => {
    const data = {
        id: req.params.id,
        status: req.body.status
    }
    StatusService.updateOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

StatusController.deleteOne = (req, res , next) => {
    const id = req.params.id
    StatusService.deleteOne(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

module.exports = StatusController;