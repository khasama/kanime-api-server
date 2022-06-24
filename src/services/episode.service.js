const EpisodeModel = require('../models/episode.model');

const EpisodeService = {}

EpisodeService.getEp = async (data) => {
    const [rows] = await EpisodeModel.getEp(data);
    return {message: "Success", data: rows};
}
EpisodeService.getFullUrl = async (data) => {
    const [rows] = await EpisodeModel.getFullUrl(data);
    return {message: "Success", data: rows};
}

EpisodeService.updateOne = async (data) => {
    const [rows] = await EpisodeModel.updateOne(data);
    if(rows.affectedRows != 0) return {message: "Success"};
    return {message: "Failed", error: "Can not update"};
    
}

EpisodeService.addEP = async (data) => {
    const [rows] = await EpisodeModel.getOneEp(data, false);
    if(rows.length == 0){
        const [rs] = await EpisodeModel.addEP(data);
        if(rs.insertId != 0) return {message: "Success"};
    }
    return {message: "Failed", error: "Already exist"};
    
}

EpisodeService.deleteEp = async (id) => {
    const [rows] = await EpisodeModel.deleteEp(id);
    if(rows.affectedRows > 0){
        return {message: "Success"};
    }
    return {message: "Failed", error: "Can not delete"};
    
}

EpisodeService.getLink = async (id) => {
    const [rows] = await EpisodeModel.getOneEp(id, true);
    return {message: "Success", data: rows};
}

module.exports = EpisodeService;