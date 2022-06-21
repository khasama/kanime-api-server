const AnimeModel = require('../models/anime.model');
const GenreModel = require('../models/genre.model');
const slug = require('slug');
const { checkIsImage } = require('../utils/');
const fs = require('fs');

const AnimeService = {}

AnimeService.createOne = async (data, files) => {
    const image = files.image;
    const imagebg = files.imagebg;

    if(checkIsImage(image) && checkIsImage(imagebg)){
        const newImage = `${slug(data.name)}-${Date.now()}.${image.mimetype.split("/")[1]}`;
        const newImageBG = `${slug(data.name)}-bg-${Date.now()}.${imagebg.mimetype.split("/")[1]}`;
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
        if(rows.affectedRows == 1){
            image.mv(`./src/uploads/anime/${newImage}`, (err) => {
                if(err) return err;
            });
            imagebg.mv(`./src/uploads/anime/${newImageBG}`, (err) => {
                if(err) return err;
            });
            const [anime] = await AnimeModel.getInformation(rows.insertId);
            return {message: "Success", data:anime};
        } 
    }
    return {message: "Failed", error: "Only image"};
    
}

AnimeService.updateOne = async (data, files) => {
    let imageCheck = true;
    let imagebgCheck = true;
    let error = [];

    let anime = {
        id: data.id,
        name: data.name,
        othername: data.othername,
        year: data.year,
        content: data.content,
        view: data.view,
        liked: data.liked,
        mainserver: data.mainserver,
        status: data.status,
        image: data.image,
        imagebg: data.imagebg
    };
    if(files != null){
        if(files.nimage != undefined && checkIsImage(files.nimage)){
            const image = files.nimage;
            const newImage = `${slug(data.name)}-${Date.now()}.${image.mimetype.split("/")[1]}`;
            anime.image = newImage;
            image.mv(`./src/uploads/anime/${newImage}`, (err) => {
                if(err){
                    imageCheck = false;
                    error.push(err);
                }else{
                    fs.unlink(`./src/uploads/anime/${data.image}`, (e) => {
                        if (e){
                            imageCheck = false;
                            error.push(err);
                        }
                    });
                } 
            });
            
        }
        if(files.nimagebg != undefined && checkIsImage(files.nimagebg)){
            
            const imagebg = files.nimagebg;
            const newImageBG = `${slug(data.name)}-bg-${Date.now()}.${imagebg.mimetype.split("/")[1]}`;
            anime.imagebg = newImageBG;
            imagebg.mv(`./src/uploads/anime/${newImageBG}`, (err) => {
                if(err){
                    imagebgCheck = false;
                    error.push(err);
                }else{
                    fs.unlink(`./src/uploads/anime/${data.imagebg}`, (e) => {
                        if (e) {
                            imagebgCheck = false;
                            error.push(err);
                        }
                    });
                }
                
            });
        }
    }

    if(imageCheck && imagebgCheck){
        const [rows] = await(AnimeModel.updateOne(anime));
        if(rows.affectedRows == 1){  
            const [anime] = await AnimeModel.getInformation(data.id);
            return {message: "Success", data:anime};
        }
    }
    return {message: "Failed", error:error}
}

AnimeService.getAll = async () => {
    const [rows] = await(AnimeModel.getAll());
    return {message: "Success", data:rows};
}

AnimeService.getInformation = async (id) => {
    const [genre] = await GenreModel.getAGOA(id);
    const [anime] = await AnimeModel.getInformation(id);
    if(!anime[0]) return {message: "Failed", error: "Not found"};
    return {message:"Success", data:{...anime[0], ...{Genre:genre}}};
}

AnimeService.deleteSoft = async (id) => {
    const [result] = await AnimeModel.deleteSoft(id);
    if(result.affectedRows == 0) return {message: "Failed", error: "Not found"};
    return {message: "Success", result: "Delete success"};
}

AnimeService.activateOne = async (id) => {
    const [result] = await AnimeModel.activateOne(id);
    if(result.affectedRows == 0) return {message: "Failed", error: "Not found"};
    return {message: "Success", result: "Activate success"};
}

AnimeService.addGenre = async (data) => {
    const [rows] = await AnimeModel.addGenre(data);
    if(rows.insertId > 0){
        const [genre] = await GenreModel.getAGOA(data.idAnime);
        const [anime] = await AnimeModel.getInformation(data.idAnime);
        return {message:"Success", data:{...anime[0], ...{Genre:genre}}};
    }
    return {message: "Failed", result: "Can not add"};
}


module.exports = AnimeService;