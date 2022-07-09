const promisePool = require('./db');

let time = `${new Date().toISOString().slice(0, 10)}  ${new Date().toLocaleTimeString('en-US', {hour12: false})}`;

function User(user){
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.avatar = 'unknow.jpg';
    this.role = 3;
    this.lastaccess = time;
}

User.register = async (user) => {
    return await promisePool.execute(`
        INSERT INTO tb_user
        VALUES (NULL, ?, ?, ?, ?, ?, ?)
        `,
        [
            user.email,
            user.username,
            user.password,
            user.avatar,
            user.role,
            user.lastaccess
        ]
    );
}

// check Email and Username
User.checkEU = async (username) => {
    return await promisePool.execute(`
        SELECT * FROM tb_user
        WHERE Email = ? OR Username = ?
        LIMIT 0, 1
        `,
        [username, username]
    );
}

// update last access
User.updateLastAccess = async (idUser) => {
    return await promisePool.execute(`
        UPDATE tb_user
        SET LastAccess = ?
        WHERE idUser = ?
        `,
        [time, idUser]
    );
}

User.getAll = async () => {
    return await promisePool.execute(`
        SELECT * FROM tb_user
        INNER JOIN tb_role
        ON tb_user.idRole = tb_role.idRole
        ORDER BY tb_user.idRole ASC`
    );
}

module.exports = User;