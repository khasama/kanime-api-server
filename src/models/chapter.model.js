const promisePool = require("./db");

function Chapter(chapter) {
    this.idManga = chapter.idManga;
    this.idSource = chapter.idSource;
    this.chapter = chapter.chapter;
    this.list = chapter.list;
}

// get all chapter of manga with main source
Chapter.getAllChap = async (data) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_chapter
        INNER JOIN tb_manga_source
        ON tb_chapter.idSource = tb_manga_source.idSource
        WHERE tb_chapter.idManga = ? 
        AND tb_chapter.idSource = ?
        ORDER BY tb_chapter.Chapter ASC
        `,
        [data.idManga, data.idSource]
    );
};

// get all server one ep
Chapter.getAllList = async (data) => {
    return await promisePool.execute(
        `
        SELECT tb_chapter.idChapter, tb_manga_source.Source, tb_chapter.idSource FROM tb_chapter
        INNER JOIN tb_manga_source
        ON tb_chapter.idSource = tb_manga_source.idSource
        WHERE tb_chapter.idManga = ? 
        AND tb_chapter.Chapter = ?
        `,
        [data.idManga, data.chapter]
    );
};

Chapter.updateOne = async (data) => {
    return await promisePool.execute(
        `
        UPDATE tb_chapter
        SET List = ?
        WHERE idChapter = ?
        `,
        [data.list, data.idChapter]
    );
};

Chapter.addChap = async (data) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_chapter
        VALUES (NULL, ?, ?, ?, ?)
        `,
        [data.chapter, data.idManga, data.idSource, data.list]
    );
};

Chapter.getOneChap = async (data, link) => {
    if (link) {
        return await promisePool.execute(
            `
            SELECT * FROM tb_chapter
            INNER JOIN tb_manga_source
            ON tb_chapter.idSource = tb_manga_source.idSource
            WHERE tb_chapter.idChapter = ?
            `,
            [data]
        );
    }
    return await promisePool.execute(
        `
        SELECT idChapter FROM tb_chapter
        WHERE idManga = ?
        AND idSource = ?
        AND Chapter = ?
        `,
        [data.idManga, data.idSource, data.chapter]
    );
};

Chapter.deleteEp = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_chapter
        WHERE idChapter = ?
        `,
        [id]
    );
};

module.exports = Chapter;
