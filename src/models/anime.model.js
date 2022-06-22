const pool = require('./db');
const slug = require('slug');
const promisePool = pool.promise();

function Anime(anime) {
    this.name = anime.name;
    this.othername = anime.othername;
    this.slug = slug(anime.name);
    this.year = anime.year;
    this.content = anime.content;
    this.view = 0;
    this.liked = 0;
    this.image = anime.image;
    this.imagebg = anime.imagebg;
    this.mainserver = 4;
    this.status = 2;
    this.newupdate = 0;
    this.activate = 1;
}


Anime.createOne = async (anime) => {
    return await promisePool.execute(`
        INSERT INTO tb_anime
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, 
        [
            anime.name, 
            anime.othername, 
            anime.slug, 
            anime.year, 
            anime.content, 
            anime.view, 
            anime.liked, 
            anime.image, 
            anime.imagebg,
            anime.mainserver,
            anime.status,
            anime.newupdate,
            anime.activate
        ]
    );
}

Anime.updateOne = async (anime) => {

    return await promisePool.execute(`
        UPDATE tb_anime
        SET Name = ?,
            OtherName = ?,
            Slug = ?,
            idYear = ?,
            Content = ?,
            View = ?,
            Liked = ?,
            Image = ?,
            ImageBG = ?,
            MainServer = ?,
            idStatus = ?
        WHERE idAnime = ?
        `, 
        [
            anime.name, 
            anime.othername, 
            slug(anime.name), 
            anime.year, 
            anime.content, 
            anime.view, 
            anime.liked, 
            anime.image, 
            anime.imagebg,
            anime.mainserver,
            anime.status,
            anime.id
        ]
    );
}

Anime.addGenre = async (data) => {
    return await promisePool.execute(`
        INSERT INTO tb_genre_anime
        VALUES (NULL, ?, ?)
        `,
        [
            data.idAnime,
            data.idGenre
        ]
    );
}

Anime.deleteGenre = async (id) => {
    return await promisePool.execute(`
        DELETE FROM tb_genre_anime
        WHERE idGA = ?
        `,
        [id]
    );
}

Anime.checkGenre = async (data) => {
    return await promisePool.execute(`
        SELECT idGA FROM tb_genre_anime
        WHERE idAnime = ? AND idGenre = ?
        `,
        [
            data.idAnime,
            data.idGenre
        ]
    );
}

Anime.getAll = async () => {
    return await promisePool.execute(`
        SELECT * FROM tb_anime
        INNER JOIN tb_status 
        ON tb_anime.idStatus = tb_status.idStatus
        `
    );
}

Anime.getInformation = async (id) => {
    return await promisePool.execute(`
        SELECT * FROM tb_anime 
        INNER JOIN tb_status
        ON tb_anime.idStatus = tb_status.idStatus
        INNER JOIN tb_year
        ON tb_anime.idYear = tb_year.idYear
        WHERE tb_anime.idAnime = ?
        `, 
        [id]
    );
    
}

Anime.deleteSoft = async (id) => {
    return await promisePool.execute(`
        UPDATE tb_anime
        SET Activate = 0
        WHERE idAnime = ?
        `, 
        [id]
    );
}

Anime.activateOne = async (id) => {
    return await promisePool.execute(`
        UPDATE tb_anime
        SET Activate = 1
        WHERE idAnime = ?
        `, 
        [id]
    );
}

module.exports = Anime;
