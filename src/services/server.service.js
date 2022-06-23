const ServerModel = require('../models/server.model');

const ServerService = {}

ServerService.getAll = async () => {
    const [rows] = await ServerModel.getAll();
    return {message: "Success", data: rows}
}

ServerService.createOne = async (data) => {
    const server = new ServerModel(data);
    const [rows] = await ServerModel.createOne(server);
    if(rows.insertId > 0) return {message: "Success"};
    return {message: "Failed", error: "Can not create"};
}

ServerService.updateOne = async (data) => {
    const [rows] = await ServerModel.updateOne(data);
    if(rows.affectedRows != 0) return {message: "Success"};
    return {message: "Failed", error: "Can not update"};
}

ServerService.deleteOne = async (id) => {
    const [check] = await ServerModel.getOneEp(id);
    if(check.length == 0){
        const [rows] = await ServerModel.deleteOne(id);
        if(rows.affectedRows != 0) return {message: "Success"};
    }
    return {message: "Failed", error: "Server is in use"};
}

module.exports = ServerService;