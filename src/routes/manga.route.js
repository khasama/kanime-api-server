const express = require("express");
const router = express.Router();
const MangaController = require("../controllers/manga.controller");
const { verifyToken } = require("../middlewares");

router.get("/all", MangaController.getAll);
router.post("/", verifyToken(2), MangaController.createOne);
router.post("/add-genre", verifyToken(2), MangaController.addGenre);
router.delete("/delete-genre", verifyToken(2), MangaController.deleteGenre);
router.put("/update/:id", verifyToken(2), MangaController.updateOne);
router.put("/activate/:id", verifyToken(2), MangaController.activateOne);
router.delete("/delete/:id", verifyToken(2), MangaController.deleteSoft);
router.get("/:id", MangaController.getInformation);

module.exports = router;
