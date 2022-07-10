require('dotenv').config();
const jwt = require('jsonwebtoken');
const createError = require('http-errors');


module.exports = {
    verifyToken: (type = 3) => {
        return (req, res, next) => {
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return next(createError.Unauthorized());
            }

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if(err) return next(createError.Unauthorized());
                const role = payload.role;
                
                switch(type) {
                    case 1:
                        if(role == 1){
                            next();
                            break;
                        }
                        return next(createError.Forbidden());

                    case 2:
                        if(role == 1 || role == 2){
                            next();
                            break;
                        }
                        return next(createError.Forbidden());

                    default: return next(createError.Unauthorized());
                }
            });
        }
    },
    verifyAccessToken: (req, res, next) => {
        const token = req.cookies.access_token;
        if(!token){
            return next(createError.Unauthorized());
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) return next(createError.Unauthorized());
            req.payload = payload;
            next();
        });
    },
    adminVerify: (req, res, next) => {
        const token = req.cookies.access_token;
        if(!token){
            return next(createError.Unauthorized());
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) return next(createError.Unauthorized());
            if(payload.role != 1){
                return next(createError.Forbidden());
            }
            next();
        });
    },
    adminAndModVerify: (req, res, next) => {
        const token = req.cookies.access_token;
        if(!token){
            return next(createError.Unauthorized());
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) return next(createError.Unauthorized());
            if(payload.role != 1){
                return next(createError.Forbidden());
            }
            next();
        });
    },
}