const AnimeModel = require('../models/anime.model');
const GenreModel = require('../models/genre.model');
const slug = require('slug');

const AnimeService = {}

AnimeService.createOne = async (data) => {
    const image = data.image;
    const imagebg = data.imagebg;

    const newImage = `${slug(data.name)}-${Date.now()}.${image.mimetype.split("/")[1]}`;
    const newImageBG = `${slug(data.name)}-bg-${Date.now()}.${imagebg.mimetype.split("/")[1]}`;
    image.mv(`./src/uploads/anime/${newImage}`, (err) => {
        if(err) return err;
    });
    imagebg.mv(`./src/uploads/anime/${newImageBG}`, (err) => {
        if(err) return err;
    });

    const anime = new AnimeModel(
        {
            name: data.name,
            othername: data.othername,
            year: data.year,
            content: data.content,
            image: newImage,
            imagebg: newImageBG
        }
    );
    const [rows] = await(AnimeModel.createOne(anime));
    if(rows.affectedRows == 1) return {result: "Create Success"};
    return {result: "Create Failed"};
}

AnimeService.getAll = async () => {
    const [rows] = await(AnimeModel.getAll());
    return rows;
}

AnimeService.getInformation = async (id) => {
    const [genre] = await GenreModel.getAGOA(id);
    const [anime] = await AnimeModel.getInformation(id);
    if(!anime[0]) return {Error: "Not found"};
    return {...anime[0], ...{Genre:{genre}}};
}

AnimeService.deleteSoft = async (id) => {
    const [result] = await AnimeModel.deleteSoft(id);
    if(result.affectedRows == 0) return {Error: "Not found"};
    return {data: "Delete success"};
}

AnimeService.activateOne = async (id) => {
    const [result] = await AnimeModel.activateOne(id);
    if(result.affectedRows == 0) return {Error: "Not found"};
    return {data: "Activate success"};
}


module.exports = AnimeService;