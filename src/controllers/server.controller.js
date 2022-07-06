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
    const server = req.body.server;
    const description = req.body.description;
    if(server && description){
        const data = {
            server,
            description
        }
        ServerService.createOne(data)
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

ServerController.updateOne = (req, res , next) => {
    const id = req.params.id;
    const server = req.body.server;
    const description = req.body.description;
    if(id && server && description){
        const data = {
            id,
            server,
            description
        }
        ServerService.updateOne(data)
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

ServerController.deleteOne = (req, res , next) => {
    const id = req.params.id
    if(id){
        ServerService.deleteOne(id)
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

module.exports = ServerController;