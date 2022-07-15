const SeasonModel = require("../models/season.model");

const SeasonService = {};

SeasonService.getAnimeSeason = async (id) => {
    try {
        const [rows] = await SeasonModel.getAnimeSeason(id);
        if (rows.length != 0) return { status: "success", data: rows };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

SeasonService.addSeason = async (data) => {
    try {
        const [isSeason] = await SeasonModel.getAnimeSeason(data.idAnime);
        if (isSeason.length == 0) {
            const season = new SeasonModel(data);
            const [rows] = await SeasonModel.addSeason(season);
            if (rows.insertId != 0) {
                const [ss] = await SeasonModel.getAnimeSeason(data.idAnime);
                return { status: "success", data: ss };
            }
        }
        return { status: "failed", message: "Anime is Season" };
    } catch (error) {
        throw error;
    }
};

SeasonService.deleteSeason = async (id) => {
    try {
        const [rows] = await SeasonModel.deleteSeason(id);
        if (rows.affectedRows != 0) return { status: "success" };
        return { status: "failed", message: "Can not detele" };
    } catch (error) {
        throw error;
    }
};

module.exports = SeasonService;
