const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { signAccessToken } = require('../utils')

const UserService = {}

UserService.register = async (data) => {
    try {
        const [username] = await UserModel.checkEU(data.username);
        const [email] = await UserModel.checkEU(data.email);
        if(username.length == 0 && username.length == 0){
            const pass = data.password;
            const hash = await bcrypt.hash(pass, 10);
            const user = new UserModel(
                { 
                    email: data.email, 
                    username: data.username,
                    password: hash
                }
            );
            const [rows] = await UserModel.register(user);
            if(rows.insertId > 0){
                return {status: "Success"}
            }
        }else{
            return {status: "Failed", message: "Email or Username already used"}
        }
    } catch (error) {
        throw error;
    }
}

UserService.login = async (data) => {
    try {
        const [rows] = await UserModel.checkEU(data.username);
        if(rows.length != 0){
            const u = rows[0];
            const match = await bcrypt.compare(data.password, u.Password);
            if(match){
                const user = {id: u.idUser, usernane : u.Username, role: u.idRole};
                const accessToken = await signAccessToken(user);
                await UserModel.updateLastAccess(u.idUser);
                return {status: "Success", data: {user, accessToken}};
            }else {
                return {status: "Failed", message: "Wrong password"};
            }
        }else{
            return {status: "Failed", message: "Not found"};
        }
    } catch (error) {
        throw error;
    }
}

UserService.loginAdminSite = async (data) => {
    try {
        const [rows] = await UserModel.checkEU(data.username);
        if(rows.length != 0){
            const u = rows[0];
            const match = await bcrypt.compare(data.password, u.Password);
            if(match){
                if(u.idRole == 1 || u.idRole == 2){
                    const user = {id: u.idUser, usernane : u.Username, avatar: u.Avatar};
                    const accessToken = await signAccessToken({...user,...{role: u.idRole}});
                    await UserModel.updateLastAccess(u.idUser);
                    return [{status: "Success", data: user}, accessToken];

                }else{
                    return {status: "Failed", message: "You not admin"};
                }
                
            }else {
                return {status: "Failed", message: "Wrong password"};
            }
        }else{
            return {status: "Failed", message: "Not found"};
        }
    } catch (error) {
        throw error;
    }
}

UserService.getAll = async () => {
    try {
        const [rows] = await UserModel.getAll();
        if(rows.length != 0 ) return {status: "Success", data: rows};
        return {status: "Failed", message: "Not found"};
    } catch (error) {
        throw error;
    }
}

module.exports = UserService;