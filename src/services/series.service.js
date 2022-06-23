const SeriesModel = require('../models/series.model');

const SeriesService = {}

SeriesService.getAll = async () => {
    const [rows] = await SeriesModel.getAll();
    return {message: "Success", data: rows};
}

SeriesService.createOne = async (data) => {
    const [rows] = await SeriesModel.createOne(new SeriesModel({series: data.series}));
    if(rows.insertId != 0){
        const [series] = await SeriesModel.getInformation(rows.insertId);
        return {message: "Success", data: series};
    }
    return {message: "Failed", error: "Can not create"};
}

SeriesService.updateOne = async (data) => {
    const [rows] = await SeriesModel.updateOne(data);
    if(rows.affectedRows != 0){
        const [series] = await SeriesModel.getInformation(data.id);
        return {message: "Success", data: series};
    }
    return {message: "Failed", error: "Not found"};
}

SeriesService.deleteOne = async (id) => {
    const [check] = await SeriesModel.getASS(id);
    if(check.length == 0){
        const [rows] = await SeriesModel.deleteOne(id);
        if(rows.affectedRows != 0){
            return {message: "Success", result: "Delete success"};
        }
    }
    return {message: "Failed", error: "Can not delete"};
}

SeriesService.getASS = async (id) => {
    const [rows] = await SeriesModel.getASS(id);
    if(rows.length != 0){
        return {message: "Success", data: rows};
    }
    return {message: "Success", data: "Emty"};
}

module.exports = SeriesService;