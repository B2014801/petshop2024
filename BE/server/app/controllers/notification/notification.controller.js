const MongoDB = require('../../utils/mongodb.util');
const NotificationService = require('../../services/notification.service');
exports.create = async (req, res, next) => {
    try {
    } catch (error) {
        const notificationService = NotificationService(MongoDB.client);
        let result = await notificationService.create(req.body);
        if (result) {
            res.send(result);
        }
        console.log(error);
    }
};
exports.getAll = async (req, res, next) => {
    try {
        const notificationService = new NotificationService(MongoDB.client);
        let result = await notificationService.getAll();

        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
};
