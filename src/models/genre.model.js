const pool = require('./db');
const promisePool = pool.promise();

const Genre = (genre) => {
    this.Genre = genre.genre;
    this.GenreSlug = genre.genreSlug;
};

Genre.getAll = (result) => {
    pool.execute("SELECT * FROM tb_genre", (err, rows, fields) => {
        if(err){
            console.log(err);
        }
        result(err, rows);
    });
}

// AllAnimeOfGenre
Genre.getAAOG = (id, result) => {  
    pool.execute(`
        SELECT * FROM tb_genre_anime 
        INNER JOIN tb_anime
        ON tb_genre_anime.idAnime = tb_anime.idAnime
        WHERE tb_genre_anime.idGenre = ?
    `, [id], (err, rows, fields) => {
        if(err){
            console.log(err);
        }     
        result(err, rows);
    });
}

// AllGenreOfAnime
Genre.getAGOA = async (id, result) => {  
    const [rows, fields] = await promisePool.execute(`
        SELECT tb_genre.idGenre, tb_genre.Genre, tb_genre.GenreSlug FROM tb_genre_anime 
        INNER JOIN tb_genre 
        ON tb_genre_anime.idGenre = tb_genre.idGenre 
        WHERE tb_genre_anime.idAnime = ?`, 
        [id]
    );
    result(rows);
}


module.exports = Genre;