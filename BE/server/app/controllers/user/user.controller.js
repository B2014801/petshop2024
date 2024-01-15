const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const UserService = require('../../services/user.service');
const fs = require('fs');
const path = require('path');

exports.findById = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const documents = await userService.findById(req.params.id);
        res.send(documents);
    } catch (error) {
        console.log(error);
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const documents = await userService.findAll();
        res.send(documents);
    } catch (error) {
        console.log(error);
    }
};
exports.update = async (req, res, next) => {
    if (req.body.length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        let img = null;
        if (req.file) {
            const userService = new UserService(MongoDB.client);
            const productImg = await userService.findById(req.body._id);
            const url = productImg.img;
            const parts = url.split('/');
            // Get the last part of the URL, which should be the file name
            const fileName = parts[parts.length - 1];
            const filePath = path.join(__dirname, `../../store/img/user/${fileName}`);

            if (fs.existsSync(filePath)) {
                if (fileName != 'defaultuser.jpg') {
                    fs.unlinkSync(filePath);
                }
            }
            img = await (process.env.SERVER_LINK_USER_IMG + req.file.filename);
        }
        const userService = new UserService(MongoDB.client);
        const result = await userService.update(req.body, img);
        if (result) {
            res.send(result);
        } else {
            console.log('error');
        }
    } catch (error) {
        console.log(error);
    }
};
