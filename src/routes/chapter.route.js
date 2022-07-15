const express = require("express");
const router = express.Router();
const ChapterController = require("../controllers/chapter.controller");
const { verifyToken } = require("../middlewares");

router.get("/get-chapters/:idManga-:idSource", ChapterController.getAllChap);
router.get("/get-chap/:id", ChapterController.getOneChap);
router.get("/get-flist/:idManga-:chapter", ChapterController.getAllList);
// router.post('/add', verifyToken(2), ChapterController.addEP);
// router.post('/add-multi', verifyToken(2), ChapterController.addMultiEP);
// router.put('/update/:id', verifyToken(2), ChapterController.updateOne);
// router.delete('/delete/:id', verifyToken(1), ChapterController.deleteEp);

module.exports = router;
