const YearModel = require('../models/year.model');
const AnimeModel = require('../models/anime.model');

const YearService = {}

YearService.getAll = async () => {
    const [rows] = await YearModel.getAll();
    return {message: "Success", data: rows}
}

YearService.createOne = async (data) => {
    const [rows] = await YearModel.createOne(new YearModel(data));
    if(rows.insertId > 0) return {message: "Success"};
    return {message: "Failed", error: "Can not create"};
}

YearService.updateOne = async (data) => {
    const [rows] = await YearModel.updateOne(data);
    return {message: "Success", data: rows}
}

YearService.deleteOne = async (id) => {
    const [check] = await AnimeModel.getASY(id, false);
    if(check.length == 0){
        const [rows] = await YearModel.deleteOne(id);
        if(rows.affectedRows != 0 ) return {message: "Success"};
    }
    return {message: "Failed", error: "Can not delete"};
}

module.exports = YearService;