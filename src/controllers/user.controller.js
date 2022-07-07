const UserService = require('../services/user.service');

const UserController = {}

UserController.loginAdminSite = async (req, res , next) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        const data = {
            username,
            password
        }
        UserService.loginAdminSite(data)
        .then(rs => {
            return res.status(200)
                    .cookie('access_token', rs[1], {
                        maxAge: 365 * 24 * 60 * 60 * 100,
                        httpOnly: true,
                        domain: 'localhost',
                    })
                    .json(rs[0]);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        })
    }else{
        return res.status(400).json({status: "Failed", message: "Mising params"});
    }
}

UserController.login = async (req, res , next) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        const data = {
            username,
            password
        }
        UserService.login(data)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        })
    }else{
        return res.status(400).json({status: "Failed", message: "Mising params"});
    }
}

UserController.register = async (req, res , next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    if(email && username && password){
        const data = {
            email,
            username,
            password
        }
        UserService.register(data)
        .then(rs => {
            return res.status(200).json(rs);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({status: "Error", message: "Has a fucking error"});
        })
    }else{
        return res.status(400).json({status: "Failed", message: "Mising params"});
    }
}

module.exports = UserController;