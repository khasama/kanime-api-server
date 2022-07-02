const SeriesModel = require('../models/series.model');

const SeriesService = {}

SeriesService.getAll = async () => {
    try {
        const [rows] = await SeriesModel.getAll();
        return {status: "Success", data: rows};
    } catch (error) {
        throw error;
    }
}

SeriesService.createOne = async (data) => {
    try {
        const [rows] = await SeriesModel.createOne(new SeriesModel({series: data.series}));
        if(rows.insertId != 0){
            const [series] = await SeriesModel.getInformation(rows.insertId);
            return {status: "Success", data: series};
        }
        return {status: "Failed", message: "Can not create"};
    } catch (error) {
        throw error;
    }
}

SeriesService.updateOne = async (data) => {
    try {
        const [rows] = await SeriesModel.updateOne(data);
        if(rows.affectedRows != 0){
            const [series] = await SeriesModel.getInformation(data.id);
            return {status: "Success", data: series};
        }
        return {status: "Failed", message: "Not found"};
    } catch (error) {
        throw error;
    }
}

SeriesService.deleteOne = async (id) => {
    try {
        const [check] = await SeriesModel.getASS(id);
        if(check.length == 0){
            const [rows] = await SeriesModel.deleteOne(id);
            if(rows.affectedRows != 0){
                return {status: "Success"};
            }
        }
        return {status: "Failed", message: "Can not delete"};
    } catch (error) {
        throw error;
    }
}

SeriesService.getASS = async (id) => {
    try {
        const [rows] = await SeriesModel.getASS(id);
        if(rows.length != 0){
            return {status: "Success", data: rows};
        }
        return {status: "Failed", message: "Emty"};
    } catch (error) {
        throw error;
    }
}

module.exports = SeriesService;