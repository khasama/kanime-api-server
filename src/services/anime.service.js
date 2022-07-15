const AnimeModel = require("../models/anime.model");
const GenreModel = require("../models/genre.model");
const slug = require("slug");
const { uploadToAWS } = require("../utils/");
const fs = require("fs");

const AnimeService = {};

AnimeService.createOne = async (data) => {
    try {
        const image = data.image;
        const imagebg = data.imagebg;
        const bufImg = Buffer.from(image, "base64");
        const bufImgBG = Buffer.from(imagebg, "base64");
        const newImage = `${slug(data.name)}-${Date.now()}.webp`;
        const newImageBG = `${slug(data.name)}-bg-${Date.now()}.webp`;
        const anime = new AnimeModel({
            name: data.name,
            othername: data.othername,
            year: data.year,
            content: data.content,
            image: newImage,
            imagebg: newImageBG,
        });
        const [rows] = await AnimeModel.createOne(anime);
        if (rows.insertId > 0) {
            fs.writeFile(`./src/uploads/anime/${newImage}`, bufImg, (err) => {
                if (!err) {
                    uploadToAWS({
                        path: `./src/uploads/anime/${newImage}`,
                        name: newImage,
                    })
                        .then((rs) => {
                            fs.unlink(`./src/uploads/anime/${rs.Key}`, (e) => {
                                if (e) throw new Error(e.message);
                            });
                        })
                        .catch((err) => console.log(err));
                }
            });
            fs.writeFile(
                `./src/uploads/anime/${newImageBG}`,
                bufImgBG,
                (err) => {
                    if (!err) {
                        uploadToAWS({
                            path: `./src/uploads/anime/${newImageBG}`,
                            name: newImageBG,
                        })
                            .then((rs) => {
                                fs.unlink(
                                    `./src/uploads/anime/${rs.Key}`,
                                    (e) => {
                                        if (e) throw new Error(e.message);
                                    }
                                );
                            })
                            .catch((err) => console.log(err));
                    }
                }
            );

            const [anime] = await AnimeModel.getInformation(rows.insertId);
            return { status: "success", data: anime };
        }
    } catch (error) {
        throw error;
    }
};

AnimeService.updateOne = async (data, id) => {
    try {
        const anime = {
            id: id,
            name: data.name,
            othername: data.othername,
            year: data.year,
            content: data.content,
            view: data.view,
            liked: data.liked,
            mainserver: data.mainserver,
            status: data.status,
            image: data.oimg,
            imagebg: data.oimgbg,
        };

        if (data.nimg != undefined) {
            const bufImg = Buffer.from(data.nimg, "base64");
            const nameImg = data.oimg;
            fs.writeFile(`./src/uploads/anime/${nameImg}`, bufImg, (err) => {
                if (!err) {
                    uploadToAWS({
                        path: `./src/uploads/anime/${nameImg}`,
                        name: nameImg,
                    })
                        .then((rs) => {
                            fs.unlink(`./src/uploads/anime/${rs.Key}`, (e) => {
                                if (e) throw new Error(e.message);
                            });

                            // console.log(rs.Key);
                        })
                        .catch((err) => console.log(err));
                }
            });
        }
        if (data.nimgbg != undefined) {
            const bufImgBg = Buffer.from(data.nimgbg, "base64");
            const nameImgBg = data.oimgbg;
            fs.writeFile(
                `./src/uploads/anime/${nameImgBg}`,
                bufImgBg,
                (err) => {
                    if (!err) {
                        uploadToAWS({
                            path: `./src/uploads/anime/${nameImgBg}`,
                            name: nameImgBg,
                        })
                            .then((rs) => {
                                fs.unlink(
                                    `./src/uploads/anime/${rs.Key}`,
                                    (e) => {
                                        if (e) throw new Error(e.message);
                                    }
                                );
                                // console.log(rs.Key);
                            })
                            .catch((err) => console.log(err));
                    }
                }
            );
        }

        const [rows] = await AnimeModel.updateOne(anime);
        if (rows.affectedRows == 1) {
            const [genre] = await GenreModel.getAGOA(id);
            const [anime] = await AnimeModel.getInformation(id);
            return {
                status: "success",
                data: { ...anime[0], ...{ Genre: genre } },
            };
        }
    } catch (error) {
        throw error;
    }
};

AnimeService.getAll = async () => {
    try {
        const [rows] = await AnimeModel.getAll();
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

AnimeService.getInformation = async (id) => {
    try {
        const [genre] = await GenreModel.getAGOA(id);
        const [anime] = await AnimeModel.getInformation(id);
        if (!anime[0]) return { status: "failed", message: "Not found" };
        return {
            status: "success",
            data: { ...anime[0], ...{ Genre: genre } },
        };
    } catch (error) {
        throw error;
    }
};

AnimeService.deleteSoft = async (id) => {
    try {
        const [result] = await AnimeModel.deleteSoft(id);
        if (result.affectedRows == 0)
            return { status: "failed", message: "Not found" };
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

AnimeService.activateOne = async (id) => {
    try {
        const [result] = await AnimeModel.activateOne(id);
        if (result.affectedRows == 0)
            return { status: "failed", message: "Not found" };
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

AnimeService.addGenre = async (data) => {
    try {
        const [hasGenre] = await AnimeModel.checkGenre(data);
        if (hasGenre.length == 0) {
            const [rows] = await AnimeModel.addGenre(data);
            if (rows.insertId > 0) {
                const [genre] = await GenreModel.getAGOA(data.idAnime);
                const [anime] = await AnimeModel.getInformation(data.idAnime);
                return {
                    status: "success",
                    data: { ...anime[0], ...{ Genre: genre } },
                };
            }
        }
        return { status: "failed", message: "Genre already exist" };
    } catch (error) {
        throw error;
    }
};

AnimeService.deleteGenre = async (data) => {
    try {
        const rows = await AnimeModel.deleteGenre(data.idGA);
        if (rows.affectedRows != 0) {
            const [genre] = await GenreModel.getAGOA(data.idAnime);
            const [anime] = await AnimeModel.getInformation(data.idAnime);
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

module.exports = AnimeService;
