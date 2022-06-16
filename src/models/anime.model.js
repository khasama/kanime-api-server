const pool = require('./db');
const slug = require('slug');
const Genre = require('./genre.model');

function Anime(anime) {
    this.Name = anime.name;
    this.OtherName = anime.othername;
    this.Slug = slug(anime.name);
    this.Year = anime.year;
    this.Content = anime.content;
    this.View = 0;
    this.Liked = 0;
    this.Image = anime.image;
    this.ImageBG = anime.imagebg;
    this.MainServer = 4;
    this.Status = 2;
    this.NewUpdate = 0;
    this.Activate = 1;
}

Anime.create = (anime, result) => {
    pool.execute(`
        INSERT INTO tb_anime
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, 
        [
            anime.Name, 
            anime.OtherName, 
            anime.Slug, 
            anime.Year, 
            anime.Content, 
            anime.View, 
            anime.Liked, 
            anime.Image, 
            anime.ImageBG,
            anime.MainServer,
            anime.Status,
            anime.NewUpdate,
            anime.Activate
        ],
        (err, rows, fields) => {
            if(err){
                console.log(err);
            }
            result(err, rows);
        }
    );
}

Anime.getAll = (result) => {
    pool.execute(`
        SELECT * FROM tb_anime 
        INNER JOIN tb_status 
        ON tb_anime.idStatus = tb_status.idStatus
        `, 
        (err, rows, fields) => {
            if(err){
                console.log(err);
            }
            result(err, rows);
        }
    );
}

Anime.getInformation = async (id, result) => {
    let genre = [];
    
    await Genre.getAGOA(id, rows => {
        genre = rows;
    });

    pool.execute(`
        SELECT * FROM tb_anime 
        INNER JOIN tb_status
        ON tb_anime.idStatus = tb_status.idStatus
        INNER JOIN tb_year
        ON tb_anime.idYear = tb_year.idYear
        WHERE tb_anime.idAnime = ?
        `, 
        [id], 
        (err, rows, fields) => {
            if(err){
                console.log(err);
            }
            rows[0].Genre = genre;
            result(err, rows);
        }
    );
    
}

Anime.deleteSoft = (id, result) => {
    pool.execute(`
        UPDATE tb_anime
        SET Activate = 0
        WHERE idAnime = ?
        `, 
        [id], 
        (err, rs) => {
            if(err){
                console.log(err);
            }
            if(rs.affectedRows == 0){
                result(err, 'Not found');
            }
            else{
                result(err, rs);
            }
            
        }
    );
}


module.exports = Anime;