const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/image.controller");
const { checkRef } = require("../middlewares");

router.get("/anime/:key", checkRef, ImageController.getAnimeImage);
router.get("/manga/:idSource/:key", checkRef, ImageController.getTruyenqq);

module.exports = router;
