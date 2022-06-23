const pool = require('./db');
const promisePool = pool.promise();

function Episode(epsiode){
    this.idAnime = season.idAnime;
    this.idServer = season.idServer;
    this.epsiode = epsiode.epsiode;
    this.link = epsiode.link;
}

// get ep one server of anime
Episode.getEp = async (data) => {
    return await promisePool.execute(`
        SELECT * FROM tb_episode
        WHERE idAnime = ? 
        AND idServer = ?
        `,
        [data.idAnime, data.idServer]
    )
}


module.exports = Episode;