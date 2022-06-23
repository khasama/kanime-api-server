const pool = require('./db');
const promisePool = pool.promise();

function Season(season){
    this.idSeries = season.idSeries;
    this.idAnime = season.idAnime;
    this.season = season.season;
}

Season.addSeason = async (season) => {
    return await promisePool.execute(`
        INSERT INTO tb_season
        VALUES (NULL, ?, ?, ?)
        `,
        [season.idSeries, season.idAnime, season.season]
    );
}

Season.deleteSeason = async (id) => {
    return await promisePool.execute(`
        DELETE FROM tb_season
        WHERE idSeason = ?
        `,
        [id]
    );
}

Season.getAnimeSeason = async (idAnime) => {
    return await promisePool.execute(`
        SELECT * FROM tb_season
        INNER JOIN tb_series
        ON tb_season.idSeries = tb_series.idSeries
        WHERE tb_season.idAnime = ?
        `,
        [idAnime]
    );
}




module.exports = Season;