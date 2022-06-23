const SeasonModel = require('../models/season.model');

const SeasonService = {}

SeasonService.getAnimeSeason = async (id) => {
    const [rows] = await SeasonModel.getAnimeSeason(id);
    if(rows.length != 0) return {message: "Success", data: rows};
    return {message: "Failed", error: "Not found"};
    
}

SeasonService.addSeason = async (data) => {
    const [isSeason] = await SeasonModel.getAnimeSeason(data.idAnime);
    if(isSeason.length == 0) {
        const season = new SeasonModel(data);
        const [rows] = await SeasonModel.addSeason(season);
        if(rows.insertId != 0) return {message: "Success"};
    }
    return {message: "Failed", error: "Anime is Season"};
    
}

SeasonService.deleteSeason = async (id) => {
    const [rows] = await SeasonModel.deleteSeason(id);
    if(rows.affectedRows != 0) return {message: "Success"};
    return {message: "Failed", error: "Can not detele"};
    
}

module.exports = SeasonService;