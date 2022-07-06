const promisePool = require('./db');

function Server(server){
    this.server = server.server;
    this.description = server.description;
}

Server.getAll = async () => {
    return await promisePool.execute("SELECT * FROM tb_server ORDER BY idServer ASC");
}
Server.getOne = async (id) => {
    return await promisePool.execute("SELECT * FROM tb_server WHERE idServer = ?", [id]);
}

Server.createOne = async (server) => {
    return await promisePool.execute(`
        INSERT INTO tb_server
        VALUES (NULL, ?, ?)
        `,
        [server.server, server.description]
    );
}

Server.updateOne = async (server) => {
    return await promisePool.execute(`
        UPDATE tb_server
        SET Server = ?,
            ServerDescription = ?
        WHERE idServer = ?
        `,
        [server.server, server.description, server.id]
    );
}

Server.deleteOne = async (id) => {
    return await promisePool.execute(`
        DELETE FROM tb_server
        WHERE idServer = ?
        `,
        [id]
    );
}

Server.getOneEp = async (id) => {
    return await promisePool.execute(`
        SELECT tb_server.idServer FROM tb_server
        INNER JOIN tb_episode
        ON tb_server.idServer = tb_episode.idServer
        WHERE tb_server.idServer = ?
        LIMIT 0, 1
        `,
        [id]
    );
}

module.exports = Server;