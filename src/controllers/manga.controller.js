const MangaService = require("../services/manga.service");

const MangaController = {};

MangaController.createOne = (req, res, next) => {
    const image = req.body.image;
    const name = req.body.name;
    const content = req.body.content;

    if (image && name && content) {
        const data = {
            name,
            content,
            image,
        };
        MangaService.createOne(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

MangaController.updateOne = (req, res, next) => {
    const data = req.body.data;
    const id = req.params.id;
    if (
        id &&
        data.name &&
        data.content &&
        data.view &&
        data.mainsource &&
        data.image &&
        data.status
    ) {
        MangaService.updateOne({ ...data, ...id })
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

MangaController.getAll = (req, res, next) => {
    MangaService.getAll()
        .then((rs) => {
            return res.status(200).json(rs);
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        });
};

MangaController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        MangaService.getInformation(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

MangaController.deleteSoft = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        MangaService.deleteSoft(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

MangaController.activateOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        MangaService.activateOne(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

MangaController.addGenre = (req, res, next) => {
    const idManga = req.body.idManga;
    const idGenre = req.body.idGenre;
    if (idManga && idGenre) {
        const data = {
            idManga,
            idGenre,
        };
        MangaService.addGenre(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

MangaController.deleteGenre = (req, res, next) => {
    const idGA = req.body.idGM;
    const idManga = req.body.idManga;
    if (idGA && idManga) {
        const data = {
            idGM,
            idManga,
        };
        MangaService.deleteGenre(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "error", message: "Missing params" });
    }
};

module.exports = MangaController;
