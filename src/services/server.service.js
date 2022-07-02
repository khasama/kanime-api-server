const ServerModel = require('../models/server.model');

const ServerService = {}

ServerService.getAll = async () => {
    try {
        const [rows] = await ServerModel.getAll();
        return {status: "Success", data: rows}
    } catch (error) {
        throw error;
    }
}

ServerService.createOne = async (data) => {
    try {
        const server = new ServerModel(data);
        const [rows] = await ServerModel.createOne(server);
        if(rows.insertId > 0) return {status: "Success"};
        return {status: "Failed", message: "Can not create"};
    } catch (error) {
        throw error;
    }
}

ServerService.updateOne = async (data) => {
    try {
        const [rows] = await ServerModel.updateOne(data);
        if(rows.affectedRows != 0) return {status: "Success"};
        return {status: "Failed", message: "Can not update"};
    } catch (error) {
        throw error;
    }
}

ServerService.deleteOne = async (id) => {
    try {
        const [check] = await ServerModel.getOneEp(id);
        if(check.length == 0){
            const [rows] = await ServerModel.deleteOne(id);
            if(rows.affectedRows != 0) return {status: "Success"};
        }
        return {status: "Failed", message: "Server is in use"};
    } catch (error) {
        throw error;
    }
}

module.exports = ServerService;