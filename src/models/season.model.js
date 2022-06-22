const pool = require('./db');
const promisePool = pool.promise();

function Season(season){
    this.idSeries = season.idSeries;
    this.idAnime = season.idAnime;
    this.season = season.season;
}

Season.createOne = (season) => {
    return await promisePool.execute(`
        INSERT INTO tb_season
        VALUES (NULL, ?, ?, ?)
        `,
        [season.idSeries, season.idAnime, season.season]
    );
}




module.exports = Season;