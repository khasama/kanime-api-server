const EpisodeModel = require('../models/episode.model');

const EpisodeService = {}

EpisodeService.getEp = async (data) => {
    const [rows] = await EpisodeModel.getEp(data);
    return {message: "Success", data: rows};
}

module.exports = EpisodeService;