const YearModel = require("../models/year.model");
const AnimeModel = require("../models/anime.model");

const YearService = {};

YearService.getAll = async () => {
    try {
        const [rows] = await YearModel.getAll();
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

YearService.createOne = async (data) => {
    try {
        const [rows] = await YearModel.createOne(new YearModel(data));
        if (rows.insertId > 0)
            return { status: "success", data: { idYear: rows.insertId } };
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

YearService.updateOne = async (data) => {
    try {
        const [rows] = await YearModel.updateOne(data);
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

YearService.deleteOne = async (id) => {
    try {
        const [check] = await AnimeModel.getASY(id, false);
        if (check.length == 0) {
            const [rows] = await YearModel.deleteOne(id);
            if (rows.affectedRows != 0) return { status: "success" };
        }
        return { status: "failed", message: "Can not delete" };
    } catch (error) {
        throw error;
    }
};

module.exports = YearService;
