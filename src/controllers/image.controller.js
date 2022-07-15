const { getFile } = require("../utils/");
const fs = require("fs");
const fetch = require("node-fetch");

const config = {};

const ImageController = {};

ImageController.getAnimeImage = (req, res, next) => {
    const key = req.params.key;
    if (key != "undefined") {
        const readStream = getFile(key);
        readStream
            .on("error", (err) => {
                return res
                    .status(err.statusCode)
                    .json({ message: err.message });
            })
            .pipe(res);
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

ImageController.getTruyenqq = async (req, res, next) => {
    const key = req.params.key;
    const idSource = req.params.idSource;

    if (key && idSource) {
        const body = key.split("*");
        if (idSource == 1) {
            const ref = "http://truyenqqpro.com/";
            const host = body[0];
            const idQQ = body[1];
            const chap = body[2];
            const imgNum = body[3];
            const other = body[4];
            if (host && idQQ && chap && imgNum) {
                const rs = await fetch(
                    `http://${host}/${idQQ}/${chap}/${imgNum}?${other}`,
                    {
                        method: "GET",
                        headers: {
                            Referer: ref,
                            Host: host,
                            Accept: "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                        },
                    }
                );
                if (rs.status == 200) {
                    const blob = await rs.blob();
                    res.type(blob.type);
                    blob.arrayBuffer().then((buf) => {
                        res.send(Buffer.from(buf));
                    });
                }
            } else {
                return res
                    .status(400)
                    .json({ status: "failed", message: "Missing params" });
            }
        }
        if (idSource == 2) {
            const ref = "http://www.nettruyenco.com/";
            const host = body[0];
            const idNT = body[1];
            const idChap = body[2];
            const imgNum = body[3];
            const other = body[4];
            if (host && idNT && idChap && imgNum) {
                const rs = await fetch(
                    `http://${host}/data/images/${idNT}/${idChap}/${imgNum}?${other}`,
                    {
                        method: "GET",
                        headers: {
                            Referer: ref,
                            Host: host,
                            Accept: "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                        },
                    }
                );
                if (rs.status == 200) {
                    const blob = await rs.blob();
                    res.type(blob.type);
                    blob.arrayBuffer().then((buf) => {
                        res.send(Buffer.from(buf));
                    });
                }
            } else {
                return res
                    .status(400)
                    .json({ status: "failed", message: "Missing params" });
            }
        }
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

module.exports = ImageController;
