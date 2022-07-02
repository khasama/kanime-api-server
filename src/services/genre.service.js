const GenreModel = require('../models/genre.model');

const GenreService = {}

GenreService.getAll = async () => {
    try {
        const [rows] = await GenreModel.getAll();
        return {status: "Success", data:rows};
    } catch (error) {
        throw error;
    }
}

GenreService.getInformation = async (id) => {
    try {
        const [rows] = await GenreModel.getInformation(id);
        if(rows.length > 0) return {status: "Success", data:rows};
        return {status: "Failed", message:"Not found"};
    } catch (error) {
        throw error;
    }
}

GenreService.createOne = async (data) => {
    try {
        const [rows] = await GenreModel.createOne(new GenreModel({ genre: data.genre }));
        if(rows.insertId != 0){
            const [genre] = await GenreModel.getInformation(rows.insertId);
            return {status: "Success", data: genre};
        }
        return {status: "Failed", message: "Can not create"};
    } catch (error) {
        throw error;
    }
}

GenreService.deleteOne = async (id) => {
    try {
        const [anime] = await GenreModel.getAAOG(id);
        if(anime.length == 0){
            const [rows] = await GenreModel.deleteOne(id);
            if(rows.affectedRows != 0){
                return {status: "Success"};
            }
        }
        return {status: "Failed", message: "Genre is being used"};
    } catch (error) {
        throw error;
    }
    
}

GenreService.getAAOG = async (id) => {
    try {
        const [rows] = await GenreModel.getAAOG(id);
        if(rows.length > 0) return {status: "Success", data:rows};
        return {status: "Failed", message:"Not found"};
    } catch (error) {
        throw error;
    }
}

GenreService.updateOne = async (data) => {
    try {
        const [rows] = await GenreModel.updateOne(data);
        if(rows.affectedRows > 0){
            const [genre] = await GenreModel.getInformation(data.id);
            return {status: "Success", data: genre};
        }
        return {status: "Failed", message:"Not found"};
    } catch (error) {
        throw error;
    }
}

module.exports = GenreService;