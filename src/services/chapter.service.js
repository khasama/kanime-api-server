const ChapterModel = require("../models/chapter.model");
const ChapterService = {};

ChapterService.getAllChap = async (data) => {
    try {
        const [rows] = await ChapterModel.getAllChap(data);
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};
ChapterService.getAllList = async (data) => {
    try {
        const [rows] = await ChapterModel.getAllList(data);
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

ChapterService.updateOne = async (data) => {
    try {
        const [rows] = await ChapterModel.updateOne(data);
        if (rows.affectedRows != 0) {
            const [link] = await ChapterModel.getOneChap(data.idChapter, true);
            return { status: "success", data: link };
        }
        return { status: "failed", message: "Can not update" };
    } catch (error) {
        throw error;
    }
};

ChapterService.addChap = async (data) => {
    try {
        const [rows] = await ChapterModel.getOneChap(data, false);
        if (rows.length == 0) {
            const [rs] = await ChapterModel.addEP(data);
            if (rs.insertId != 0) {
                const [link] = await ChapterModel.getOneChap(rs.insertId, true);
                return { status: "success", data: link };
            }
        }
        return { status: "failed", message: "Already exist" };
    } catch (error) {
        throw error;
    }
};

// ChapterService.addMultiEP = async (data) => {
//     try {
//         const multi = data.multi;
//         const server = data.server;
//         const anime = data.anime;
//         const listEp = convertMulti(multi, server);
//         for (const ep of listEp) {
//             const [rows] = await ChapterModel.addEP({
//                 anime,
//                 server,
//                 episode: ep.episode,
//                 link: ep.link,
//             });
//         }

//         return { status: `success` };
//     } catch (error) {
//         throw error;
//     }
// };

ChapterService.deleteChap = async (id) => {
    try {
        const [rows] = await ChapterModel.deleteChap(id);
        if (rows.affectedRows > 0) {
            return { status: "success" };
        }
        return { status: "failed", message: "Can not delete" };
    } catch (error) {
        throw error;
    }
};

ChapterService.getOneChap = async (id) => {
    try {
        const [rows] = await ChapterModel.getOneChap(id, true);
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

module.exports = ChapterService;
