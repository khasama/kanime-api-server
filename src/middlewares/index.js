require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    verifyToken: (type = 3) => {
        return (req, res, next) => {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return next(createError.Unauthorized());
            }

            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return next(createError.Unauthorized());
                    const role = payload.role;

                    switch (type) {
                        case 1:
                            if (role == 1) {
                                next();
                                break;
                            }
                            return next(createError.Forbidden());

                        case 2:
                            if (role == 1 || role == 2) {
                                next();
                                break;
                            }
                            return next(createError.Forbidden());

                        default:
                            return next(createError.Unauthorized());
                    }
                }
            );
        };
    },
    checkRef: (req, res, next) => {
        const ref = req.headers.referer;
        if (ref) {
            const origin = ref.split("//")[1].replace("/", "");
            console.log(origin);
        }

        next();
    },
};
