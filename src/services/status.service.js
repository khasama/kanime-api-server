const StatusModel = require("../models/status.model");
const AnimeModel = require("../models/anime.model");

const StatusService = {};

StatusService.getAll = async () => {
    try {
        const [rows] = await StatusModel.getAll();
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

StatusService.createOne = async (data) => {
    try {
        const [rows] = await StatusModel.createOne(new StatusModel(data));
        if (rows.insertId > 0) {
            const [status] = await StatusModel.getOne(rows.insertId);
            return { status: "success", data: status };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

StatusService.updateOne = async (data) => {
    try {
        const [rows] = await StatusModel.updateOne(data);
        if (rows.affectedRows != 0) {
            const [status] = await StatusModel.getOne(data.id);
            return { status: "success", data: status };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

StatusService.deleteOne = async (id) => {
    try {
        const [check] = await AnimeModel.getASS(id, false);
        if (check.length == 0) {
            const [rows] = await StatusModel.deleteOne(id);
            if (rows.affectedRows != 0) return { status: "success" };
        }
        return { status: "failed", message: "Can not delete" };
    } catch (error) {
        throw error;
    }
};

module.exports = StatusService;
