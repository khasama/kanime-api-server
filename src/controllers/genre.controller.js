const Genre = require('../models/genre.model');

module.exports = {
    getAll: (req, res) => {
        Genre.getAll((err, data) => {
            if(err) return res.status(500).json({message: 'Failed'});
            return res.status(200).json({message: 'Success', data});
        });
    },
    getAAOG: (req, res) => {
        const id = req.params.id;
        Genre.getAAOG(id, (err, data) => {
            if(err) return res.status(500).json({message: 'Failed'});
            return res.status(200).json({message: 'Success', data});
        })
    }   
}