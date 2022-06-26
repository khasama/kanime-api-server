const pool = require('./db');
const promisePool = pool.promise();
const slug = require('slug');

function Status(status){
    this.status = status.status;
    this.statusslug = slug(status.status);
}

Status.getAll = async () => {
    return await promisePool.execute(`SELECT * FROM tb_status`);
}

Status.createOne = async (status) => {
    return await promisePool.execute(`
        INSERT INTO tb_status
        VALUES (NULL, ?, ?)
        `,
        [
            status.status,
            status.statusslug
        ]
    );
}

Status.updateOne = async (data) => {
    return await promisePool.execute(`
        UPDATE tb_status
        SET Status = ?,
            StatusSlug = ?
        WHERE idStatus = ?
        `,
        [
            data.status,
            slug(data.status),
            data.id
        ]
    );
}

Status.deleteOne = async (id) => {
    return await promisePool.execute(`
        DELETE FROM tb_status
        WHERE idStatus = ?
        `,
        [id]
    );
}

module.exports = Status;