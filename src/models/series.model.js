const promisePool = require('./db');

function Series(series){
    this.series = series.series;
}

Series.getAll = async () => {
    return await promisePool.execute("SELECT * FROM tb_series ORDER BY idSeries ASC");
}

Series.createOne = async (series) => {
    return await promisePool.execute(`
        INSERT INTO tb_series
        VALUES (NULL, ?)
        `,
        [series.series]
    );
}

Series.updateOne = async (data) => {
    return await promisePool.execute(`
        UPDATE tb_series
        SET Series = ?
        WHERE idSeries = ?
        `,
        [data.series, data.id]
    );
}

Series.deleteOne = async (id) => {
    return await promisePool.execute(`
        DELETE FROM tb_series
        WHERE idSeries = ?
        `,
        [id]
    );
}

Series.getInformation = async (id) => {
    return await promisePool.execute(`
        SELECT * FROM tb_series
        WHERE idSeries = ?
        `,
        [id]
    );
}

// get Anime same Series
Series.getASS = async (id) => {
    return await promisePool.execute(`
        SELECT * FROM tb_series
        INNER JOIN tb_season
        ON tb_season.idSeries = tb_series.idSeries
        INNER JOIN tb_anime
        ON tb_anime.idAnime = tb_season.idAnime
        WHERE tb_series.idSeries = ?
        ORDER BY tb_season.Season ASC
        `,
        [id]
    );
}

module.exports = Series;