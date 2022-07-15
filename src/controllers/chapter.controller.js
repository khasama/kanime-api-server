const ChapterService = require("../services/chapter.service");

const ChapterController = {};

ChapterController.getAllChap = (req, res, next) => {
    const idManga = req.params.idManga;
    const idSource = req.params.idSource;
    if (idManga && idSource) {
        const data = {
            idManga,
            idSource,
        };
        ChapterService.getAllChap(data)
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

ChapterController.updateOne = (req, res, next) => {
    const idChapter = req.params.id;
    const list = req.body.list;
    if (idChapter && list) {
        const data = {
            idChapter,
            list,
        };
        ChapterService.updateOne(data)
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

ChapterController.getAllList = (req, res, next) => {
    const idManga = req.params.idManga;
    const chapter = req.params.chapter;
    if (idManga && chapter) {
        const data = {
            idManga,
            chapter,
        };
        ChapterService.getAllList(data)
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

ChapterController.addChap = (req, res, next) => {
    const idAnime = req.body.idAnime;
    const idSource = req.body.idSource;
    const chapter = req.body.chapter;
    const list = req.body.list;
    if (idAnime && idSource && chapter && list) {
        const data = {
            idAnime,
            idSource,
            chapter,
            list,
        };
        ChapterService.addChap(data)
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

// ChapterController.addMultiEP =  (req, res, next) => {
//     const anime = req.body.anime;
//     const server = req.body.server;
//     const multi = req.body.multi;
//     if(anime && server && multi){
//         const data = {
//             anime,
//             server,
//             multi
//         }
//         ChapterService.addMultiEP(data)
//         .then(rs => {
//             return res.status(200).json(rs);
//         })
//         .catch(err => {
//             console.log(err);
//             return res.status(500).json({status: "error", message: "Has a fucking error"});
//         });
//     }else{
//         return res.status(400).json({status: "failed", message: "Missing params"});
//     }
// }

ChapterController.deleteChap = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        ChapterService.deleteChap(id)
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

ChapterController.getOneChap = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        ChapterService.getOneChap(id)
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

module.exports = ChapterController;
