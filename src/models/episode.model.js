const promisePool = require("./db");

function Episode(epsiode) {
    this.idAnime = epsiode.idAnime;
    this.idServer = epsiode.idServer;
    this.epsiode = epsiode.epsiode;
    this.link = epsiode.link;
}

// get ep one server of anime
Episode.getEp = async (data) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_episode
        INNER JOIN tb_server
        ON tb_episode.idServer = tb_server.idServer
        WHERE tb_episode.idAnime = ? 
        AND tb_episode.idServer = ?
        ORDER BY tb_episode.Episode ASC
        `,
        [data.idAnime, data.idServer]
    );
};

// get full url one ep
Episode.getFullUrl = async (data) => {
    return await promisePool.execute(
        `
        SELECT tb_episode.idEpisode, tb_episode.Link, tb_server.Server FROM tb_episode
        INNER JOIN tb_server
        ON tb_episode.idServer = tb_server.idServer
        WHERE tb_episode.idAnime = ? 
        AND tb_episode.Episode = ?
        `,
        [data.idAnime, data.episode]
    );
};

Episode.updateOne = async (data) => {
    return await promisePool.execute(
        `
        UPDATE tb_episode
        SET Link = ?
        WHERE idEpisode = ?
        `,
        [data.link, data.idEpisode]
    );
};

Episode.addEP = async (data) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_episode
        VALUES (NULL, ?, ?, ?, ?)
        `,
        [data.anime, data.episode, data.server, data.link]
    );
};

Episode.getOneEp = async (data, link) => {
    if (link) {
        return await promisePool.execute(
            `
            SELECT * FROM tb_episode
            INNER JOIN tb_server
            ON tb_episode.idServer = tb_server.idServer
            WHERE tb_episode.idEpisode = ?
            `,
            [data]
        );
    }
    return await promisePool.execute(
        `
        SELECT idEpisode FROM tb_episode
        WHERE idAnime = ?
        AND idServer = ?
        AND Episode = ?
        `,
        [data.anime, data.server, data.episode]
    );
};

Episode.deleteEp = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_episode
        WHERE idEpisode = ?
        `,
        [id]
    );
};

module.exports = Episode;
