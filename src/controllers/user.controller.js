const UserService = require('../services/user.service');

const UserController = {}

UserController.loginAdminSite = (req, res , next) => {
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
                        maxAge: 4 * 60 * 60 * 100,
                        httpOnly: true,
                        secure: true,
                        domain: 'kanime-server.herokuapp.com',
                        sameSite: "none",
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

UserController.logout = (req, res , next) => {
    return res.clearCookie("access_token").status(200).json({status: "Success"});
}

UserController.login = (req, res , next) => {
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

UserController.register = (req, res , next) => {
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

UserController.getAll = (req, res, next) => {
    UserService.getAll()
    .then(rs => {
        return res.status(200).json(rs);
    })
    .catch(err => {
        return res.status(500).json({status: "Error", message: "Has a fucking error"});
    })
}

module.exports = UserController;