const GenreModel = require('../models/genre.model');

const GenreService = {}

GenreService.getAll = async () => {
    const [rows] = await GenreModel.getAll();
    return {message: "Success", data:rows};
}

GenreService.getInformation = async (id) => {
    const [rows] = await GenreModel.getInformation(id);
    if(rows.length > 0) return {message: "Success", data:rows};
    return {message: "Failed", error:"Not found"};
}

GenreService.createOne = async (data) => {

    const [rows] = await GenreModel.createOne(new GenreModel({ genre: data.genre }));
    if(rows.insertId != 0){
        const [genre] = await GenreModel.getInformation(rows.insertId);
        return {message: "Success", data: genre};
    }
    return {message: "Failed", error: "Can not create"};
    
}

GenreService.getAAOG = async (id) => {
    const [rows] = await GenreModel.getAAOG(id);
    if(rows.length > 0) return {message: "Success", data:rows};
    return {message: "Failed", error:"Not found"};
}

module.exports = GenreService;