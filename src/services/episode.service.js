const EpisodeModel = require('../models/episode.model');
const { getRealLink, convertMulti } = require('../utils');
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
        if(rows.affectedRows != 0){
            const [link] = await EpisodeModel.getOneEp(data.idEpisode, true);
            return {status: "Success", data: link};
        }
        return {status: "Failed", message: "Can not update"};
    } catch (error) {
        throw error;
    }
}

EpisodeService.addEP = async (data) => {
    try {
        const [rows] = await EpisodeModel.getOneEp(data, false);
        if(rows.length == 0){
            const ep = {
                anime: data.anime,
                episode: data.episode,
                server: data.server,
                link: getRealLink(data.server, data.link)
            }
            const [rs] = await EpisodeModel.addEP(ep);
            if(rs.insertId != 0){
                const [link] = await EpisodeModel.getOneEp(rs.insertId, true);
                return {status: "Success", data: link};
            }
        }
        return {status: "Failed", message: "Already exist"};
    } catch (error) {
        throw error;
    }
}

EpisodeService.addMultiEP = async (data) => {
    try {
        const multi = data.multi;
        const server = data.server;
        const anime = data.anime;
        const listEp = convertMulti(multi, server);
        for (const ep of listEp) {
            const [rows] = await EpisodeModel.addEP({anime, server, episode: ep.episode, link: ep.link});
        }

        return {status: `Success`};
        
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