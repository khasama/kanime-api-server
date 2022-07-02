const ServerService = require('../services/server.service');

const ServerController = {}

ServerController.getAll = (req, res , next) => {
    ServerService.getAll()
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

ServerController.createOne = (req, res , next) => {
    const data = {
        server: req.body.server,
        description: req.body.description
    }
    ServerService.createOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

ServerController.updateOne = (req, res , next) => {
    const data = {
        id: req.params.id,
        server: req.body.server,
        description: req.body.description
    }
    ServerService.updateOne(data)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

ServerController.deleteOne = (req, res , next) => {
    const id = req.params.id
    ServerService.deleteOne(id)
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

module.exports = ServerController;