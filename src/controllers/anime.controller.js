const Anime = require('../models/anime.model');

module.exports = {
    create: (req, res, next) => {
        const anime = new Anime({
            name: 'kha pro 123',
            othername: 'kha vip pro 123',
            year: 14,
            content: 'kha pro 123 kha pro 123 kha pro 123 kha pro 123',
            image: '123',
            imagebg: '12345'
        });

        Anime.create(anime, (err, result) => {
            if(err) return res.status(500).json({message: 'Failed'});
            return res.status(200).json({message: 'Success', result});
        });
    },
    getAll: (req, res) => {
        Anime.getAll((err, data) => {
            if(err) return res.status(500).json({message: 'Failed'});
            return res.status(200).json({message: 'Success', data});
        });
    },
    getInformation: (req, res) => {
        const id = req.params.id;
        Anime.getInformation(id, (err, data) => {
            if(err) return res.status(500).json({message: 'Failed'});
            return res.status(200).json({message: 'Success', data});
        });
    },
    deleteSoft: (req, res, next) => {
        const id = req.params.id;
        Anime.deleteSoft(id, (err, result) => {
            if(err) return res.status(500).json({message: 'Failed'});
            return res.status(200).json({message: 'Success', result});
        });
    }  
}