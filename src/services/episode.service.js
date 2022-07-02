const EpisodeModel = require('../models/episode.model');

const EpisodeService = {}

EpisodeService.getEp = async (data) => {
    try {
        const [rows] = await EpisodeModel.getEp(data);
        return {status: "Success", data: rows};
    } catch (error) {
        throw error;
    }
}
EpisodeService.getFullUrl = async (data) => {
    try {
        const [rows] = await EpisodeModel.getFullUrl(data);
        return {status: "Success", data: rows};
    } catch (error) {
        throw error;
    }
}

EpisodeService.updateOne = async (data) => {
    try {
        const [rows] = await EpisodeModel.updateOne(data);
        if(rows.affectedRows != 0) return {status: "Success"};
        return {status: "Failed", message: "Can not update"};
    } catch (error) {
        throw error;
    }
}

EpisodeService.addEP = async (data) => {
    try {
        const [rows] = await EpisodeModel.getOneEp(data, false);
        if(rows.length == 0){
            const [rs] = await EpisodeModel.addEP(data);
            if(rs.insertId != 0) return {status: "Success"};
        }
        return {status: "Failed", message: "Already exist"};
    } catch (error) {
        throw error;
    }
}

EpisodeService.deleteEp = async (id) => {
    try {
        const [rows] = await EpisodeModel.deleteEp(id);
        if(rows.affectedRows > 0){
            return {status: "Success"};
        }
        return {status: "Failed", message: "Can not delete"};
    } catch (error) {
        throw error;
    }
}

EpisodeService.getLink = async (id) => {
    try {
        const [rows] = await EpisodeModel.getOneEp(id, true);
        return {status: "Success", data: rows};
    } catch (error) {
        throw error;
    }
}

module.exports = EpisodeService;