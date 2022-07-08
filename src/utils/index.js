require('dotenv').config();
const s3 = require('../configs/aws.config');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bucket = process.env.AWS_BUCKET_NAME;

function getRealLink (idServer, link){
    switch (parseInt(idServer)) {
        case 4:
            return `https://playhydrax.com/?v=${link}`;
        case 6:
            return `https://short.ink/${link}`;
        case 10:
            return `https://www.youtube.com/embed/${link}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&autoplay=0`;
        case 12:
            return `https://www.dailymotion.com/embed/video/${link}?queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false`;
        case 13:
            return link;
        case 15:
            return `https://zembed.net/v/${link}.html`;
        case 23:
            return `https://ssplay.net/v/${link}.html`;

        default: return 'Not found !!!!'
    }
}


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
    },
    getRealLink,
    convertMulti: (multi, server) => {
        const arrEps = multi.split('\n');
        const newArrEps = arrEps.map(ep => {
            return {episode: ep.split('|')[0], link: getRealLink(server,ep.split('|')[1])};
        });
        return newArrEps;
    }
}