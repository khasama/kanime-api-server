require('dotenv').config();
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization']){
            return next(createError.Unauthorized());
        }
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) return next(createError.Unauthorized());
            req.payload = payload;
            next();
        });
    }
}