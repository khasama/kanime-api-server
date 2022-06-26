const StatusModel = require('../models/status.model');
const AnimeModel = require('../models/anime.model');

const StatusService = {}

StatusService.getAll = async () => {
    const [rows] = await StatusModel.getAll();
    return {message: "Success", data: rows}
}

StatusService.createOne = async (data) => {
    const [rows] = await StatusModel.createOne(new StatusModel(data));
    if(rows.insertId > 0) return {message: "Success"};
    return {message: "Failed", error: "Can not create"};
}

StatusService.updateOne = async (data) => {
    const [rows] = await StatusModel.updateOne(data);
    return {message: "Success", data: rows}
}

StatusService.deleteOne = async (id) => {
    const [check] = await AnimeModel.getASS(id, false);
    if(check.length == 0){
        const [rows] = await StatusModel.deleteOne(id);
        if(rows.affectedRows != 0 ) return {message: "Success"};
    }
    return {message: "Failed", error: "Can not delete"};
}

module.exports = StatusService;