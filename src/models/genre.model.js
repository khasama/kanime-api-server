const pool = require('./db');
const promisePool = pool.promise();
const slug = require('slug');

function Genre(genre){
    this.genre = genre.genre;
    this.genreslug = slug(genre.genre);
};

Genre.getAll = async () => {
    return await promisePool.execute("SELECT * FROM tb_genre");
}

Genre.getInformation = async (id) => {
    return await promisePool.execute("SELECT * FROM tb_genre WHERE idGenre = ?", [id]);
}

Genre.createOne = async (genre) => {
    return await promisePool.execute(`
        INSERT INTO tb_genre
        VALUES (NULL, ?, ?)
        `,
        [
            genre.genre,
            genre.genreslug
        ]
    );
}

// AllAnimeOfGenre
Genre.getAAOG = async (id) => {  
    return await promisePool.execute(`
        SELECT * FROM tb_genre_anime 
        INNER JOIN tb_anime
        ON tb_genre_anime.idAnime = tb_anime.idAnime
        WHERE tb_genre_anime.idGenre = ?
    `, [id]);
}

// AllGenreOfAnime
Genre.getAGOA = async (id) => {  
    return await promisePool.execute(`
        SELECT tb_genre.idGenre, tb_genre.Genre, tb_genre.GenreSlug FROM tb_genre_anime
        INNER JOIN tb_genre 
        ON tb_genre_anime.idGenre = tb_genre.idGenre 
        WHERE tb_genre_anime.idAnime = ?`, 
        [id]
    );
}


module.exports = Genre;