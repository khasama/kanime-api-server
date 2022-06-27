const pool = require('./db');
const promisePool = pool.promise();

function Year(year){
    this.year = year.year;
}

Year.getAll = async () => {
    return await promisePool.execute(`SELECT * FROM tb_year`);
}

Year.createOne = async (status) => {
    return await promisePool.execute(`
        INSERT INTO tb_year
        VALUES (NULL, ?)
        `,
        [
            status.year
        ]
    );
}

Year.updateOne = async (data) => {
    return await promisePool.execute(`
        UPDATE tb_year
        SET Year = ?
        WHERE idYear = ?
        `,
        [
            data.year,
            data.id
        ]
    );
}

Year.deleteOne = async (id) => {
    return await promisePool.execute(`
        DELETE FROM tb_year
        WHERE idYear = ?
        `,
        [id]
    );
}

module.exports = Year;