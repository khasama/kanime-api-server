const GenreModel = require("../models/genre.model");

const GenreService = {};

GenreService.getAll = async () => {
    try {
        const [rows] = await GenreModel.getAll();
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

GenreService.getInformation = async (id) => {
    try {
        const [rows] = await GenreModel.getInformation(id);
        if (rows.length > 0) return { status: "success", data: rows };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

GenreService.createOne = async (data) => {
    try {
        const [rows] = await GenreModel.createOne(
            new GenreModel({ genre: data.genre })
        );
        if (rows.insertId != 0) {
            const [genre] = await GenreModel.getInformation(rows.insertId);
            return { status: "success", data: genre };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

GenreService.deleteOne = async (id) => {
    try {
        const [anime] = await GenreModel.getAAOG(id);
        if (anime.length == 0) {
            const [rows] = await GenreModel.deleteOne(id);
            if (rows.affectedRows != 0) {
                return { status: "success" };
            }
        }
        return { status: "failed", message: "Genre is being used" };
    } catch (error) {
        throw error;
    }
};

GenreService.getAAOG = async (id) => {
    try {
        const [rows] = await GenreModel.getAAOG(id);
        if (rows.length > 0) return { status: "success", data: rows };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

GenreService.updateOne = async (data) => {
    try {
        const [rows] = await GenreModel.updateOne(data);
        if (rows.affectedRows > 0) {
            const [genre] = await GenreModel.getInformation(data.id);
            return { status: "success", data: genre };
        }
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

module.exports = GenreService;
