require('dotenv').config();
const s3 = require('../configs/aws.config');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bucket = process.env.AWS_BUCKET_NAME;


module.exports = {
    checkIsImage: (file) => {
        const type = file.mimetype.split("/")[1];
        if(type == "jpg" || type === "png" || type === "jpeg" || type === "webp") return true;
        return false;
    },
    uploadToAWS: (file) => {
        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: bucket,
            Body: fileStream,
            Key: file.name
        }

        return s3.upload(uploadParams).promise();
    },
    getFile: (fileName) => {

        const downloadParams = {
            Bucket: bucket,
            Key: fileName
        }

        return s3.getObject(downloadParams).createReadStream();
    },
    signAccessToken: async (user) => {
        return new Promise((resolve, rejects) => {
            const payload = user;

            const secret = process.env.ACCESS_TOKEN_SECRET;

            const option = {
                expiresIn: '3h'
            }

            jwt.sign(payload, secret, option, (err, token) => {
                if(err) rejects(err);
                resolve(token);
            })
        });
    }
}