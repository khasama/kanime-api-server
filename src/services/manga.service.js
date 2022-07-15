const MangaModel = require("../models/manga.model");
const GenreModel = require("../models/genre.model");
const slug = require("slug");
const fs = require("fs");

const MangaService = {};

MangaService.createOne = async (data) => {
    try {
        const manga = new MangaModel(data);
        const [rows] = await MangaModel.createOne(manga);
        if (rows.insertId > 0) {
            const [m] = await MangaModel.getInformation(rows.insertId);
            return { status: "success", data: m };
        }
    } catch (error) {
        throw error;
    }
};

MangaService.updateOne = async (data) => {
    try {
        const [rows] = await MangaModel.updateOne(data);
        if (rows.affectedRows == 1) {
            const [genre] = await GenreModel.getAGOM(data.id);
            const [manga] = await MangaModel.getInformation(data.id);
            return {
                status: "success",
                data: { ...manga[0], ...{ Genre: genre } },
            };
        }
    } catch (error) {
        throw error;
    }
};

MangaService.getAll = async () => {
    try {
        const [rows] = await MangaModel.getAll();
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

MangaService.getInformation = async (id) => {
    try {
        const [genre] = await GenreModel.getAGOM(id);
        const [manga] = await MangaModel.getInformation(id);
        if (!manga[0]) return { status: "failed", message: "Not found" };
        return {
            status: "success",
            data: { ...manga[0], ...{ Genre: genre } },
        };
    } catch (error) {
        throw error;
    }
};

MangaService.deleteSoft = async (id) => {
    try {
        const [result] = await MangaModel.deleteSoft(id);
        if (result.affectedRows == 0)
            return { status: "failed", message: "Not found" };
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

MangaService.activateOne = async (id) => {
    try {
        const [result] = await MangaModel.activateOne(id);
        if (result.affectedRows == 0)
            return { status: "failed", message: "Not found" };
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

MangaService.addGenre = async (data) => {
    try {
        const [hasGenre] = await MangaModel.checkGenre(data);
        if (hasGenre.length == 0) {
            const [rows] = await MangaModel.addGenre(data);
            if (rows.insertId > 0) {
                const [genre] = await GenreModel.getAGOA(data.idManga);
                const [manga] = await MangaModel.getInformation(data.idManga);
                return {
                    status: "success",
                    data: { ...manga[0], ...{ Genre: genre } },
                };
            }
        }
        return { status: "failed", message: "Genre already exist" };
    } catch (error) {
        throw error;
    }
};

MangaService.deleteGenre = async (data) => {
    try {
        const rows = await MangaModel.deleteGenre(data.idGA);
        if (rows.affectedRows != 0) {
            const [genre] = await GenreModel.getAGOA(data.idManga);
            const [anime] = await MangaModel.getInformation(data.idManga);
            return {
                status: "success",
                data: { ...anime[0], ...{ Genre: genre } },
            };
        }
        return { status: "failed", message: "Errorrrrrrrrrr" };
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = MangaService;
