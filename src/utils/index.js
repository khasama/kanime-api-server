module.exports = {
    checkIsImage: (file) => {
        const type = file.mimetype.split("/")[1];
        if(type == "jpg" || type === "png" || type === "jpeg" || type === "webp") return true;
        return false;
    }
}