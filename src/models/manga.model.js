const promisePool = require("./db");
const slug = require("slug");

function Manga(manga) {
    this.name = manga.name;
    this.slug = slug(manga.name);
    this.content = manga.content;
    this.view = 0;
    this.image = manga.image;
    this.mainsource = 1;
    this.status = 2;
    this.newupdate = 0;
    this.activate = 1;
}

Manga.createOne = async (manga) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_manga
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
            manga.name,
            manga.slug,
            manga.content,
            manga.view,
            manga.image,
            manga.status,
            manga.newupdate,
            manga.activate,
            manga.mainsource,
        ]
    );
};

Manga.updateOne = async (manga) => {
    return await promisePool.execute(
        `
        UPDATE tb_manga
        SET Name = ?,
            Slug = ?,
            Content = ?,
            View = ?,
            Image = ?,
            MainSource = ?,
            idStatus = ?
        WHERE idManga = ?
        `,
        [
            manga.name,
            slug(manga.name),
            manga.content,
            manga.view,
            manga.image,
            manga.mainsource,
            manga.status,
            manga.id,
        ]
    );
};

Manga.addGenre = async (data) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_genre_manga
        VALUES (NULL, ?, ?)
        `,
        [data.idGenre, data.idManga]
    );
};

Manga.deleteGenre = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_genre_manga
        WHERE idGM = ?
        `,
        [id]
    );
};

Manga.checkGenre = async (data) => {
    return await promisePool.execute(
        `
        SELECT idGA FROM tb_genre_manga
        WHERE idManga = ? AND idGenre = ?
        `,
        [data.idManga, data.idGenre]
    );
};

Manga.getAll = async () => {
    return await promisePool.execute(`
        SELECT * FROM tb_manga
        INNER JOIN tb_status
        ON tb_manga.idStatus = tb_status.idStatus
        ORDER BY tb_manga.idManga ASC
        `);
};

Manga.getInformation = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_manga 
        INNER JOIN tb_status
        ON tb_manga.idStatus = tb_status.idStatus
        INNER JOIN tb_manga_source
        ON tb_manga.MainSource = tb_manga_source.idSource
        WHERE tb_manga.idManga = ?
        `,
        [id]
    );
};

Manga.deleteSoft = async (id) => {
    return await promisePool.execute(
        `
        UPDATE tb_manga
        SET Activate = 0
        WHERE idManga = ?
        `,
        [id]
    );
};

Manga.activateOne = async (id) => {
    return await promisePool.execute(
        `
        UPDATE tb_manga
        SET Activate = 1
        WHERE idManga = ?
        `,
        [id]
    );
};

module.exports = Manga;
