const promisePool = require("./db");
const slug = require("slug");

function Genre(genre) {
    this.genre = genre.genre;
    this.genreslug = slug(genre.genre);
}

Genre.getAll = async () => {
    return await promisePool.execute(
        "SELECT * FROM tb_genre ORDER BY idGenre ASC"
    );
};

Genre.getInformation = async (id) => {
    return await promisePool.execute(
        "SELECT * FROM tb_genre WHERE idGenre = ?",
        [id]
    );
};

Genre.createOne = async (genre) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_genre
        VALUES (NULL, ?, ?)
        `,
        [genre.genre, genre.genreslug]
    );
};

Genre.updateOne = async (data) => {
    return await promisePool.execute(
        `
        UPDATE tb_genre
        SET Genre = ?,
            GenreSlug = ?
        WHERE idGenre = ?
        `,
        [data.genre, slug(data.genre), data.id]
    );
};

Genre.deleteOne = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_genre
        WHERE idGenre = ?
        `,
        [id]
    );
};

// AllAnimeOfGenre
Genre.getAAOG = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_genre_anime 
        INNER JOIN tb_anime
        ON tb_genre_anime.idAnime = tb_anime.idAnime
        WHERE tb_genre_anime.idGenre = ?
        `,
        [id]
    );
};

// AllGenreOfAnime
Genre.getAGOA = async (id) => {
    return await promisePool.execute(
        `
        SELECT tb_genre.idGenre, tb_genre.Genre, tb_genre.GenreSlug, tb_genre_anime.idGA FROM tb_genre_anime
        INNER JOIN tb_genre 
        ON tb_genre_anime.idGenre = tb_genre.idGenre 
        WHERE tb_genre_anime.idAnime = ?
        `,
        [id]
    );
};

// AllMangaOfGenre
Genre.getAMOG = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_genre_manga
        INNER JOIN tb_manga
        ON tb_genre_manga.idManga = tb_manga.idManga
        WHERE tb_genre_manga.idGenre = ?
        `,
        [id]
    );
};

// AllGenreOfManga
Genre.getAGOM = async (id) => {
    return await promisePool.execute(
        `
        SELECT tb_genre.idGenre, tb_genre.Genre, tb_genre.GenreSlug, tb_genre_manga.idGM FROM tb_genre_manga
        INNER JOIN tb_genre 
        ON tb_genre_manga.idGenre = tb_genre.idGenre 
        WHERE tb_genre_manga.idManga = ?
        `,
        [id]
    );
};

module.exports = Genre;
