const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const CommentService = require('../../services/comment.service');
const BrandController = require('../brand/brand.controller');
const socket = require('../../socket/socketio'); // Adjust the path to your socket.js file
const NotificationService = require('../../services/notification.service');

exports.create = async (req, res, next) => {
    try {
        const commentService = new CommentService(MongoDB.client);
        let document = await commentService.create(req.body);

        // Get the io instance and emit a message to clients
        const io = socket.getIo();
        //broadcast message

        let notification = {
            userId: document.user_id,
            title: 'Đã thêm một bình luận',
            url: document.url + '#comment',
        };
        io.emit('comment', document);

        const notificationService = new NotificationService(MongoDB.client);
        await notificationService.create(notification);

        return res.send(document);
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const commentService = new CommentService(MongoDB.client);
        const document = await commentService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'category not found'));
        }
        return res.send({ message: 'category was updated successfully' });
    } catch (error) {
        return next(new ApiError(500, `Error updating category with id=${req.params.id} ${error}`));
    }
};
exports.deleteCategory = async (req, res, next) => {
    try {
        const resultDeleteBrandWithCategoryId = await BrandController.deleteBrandWithCategory(
            req.params.id,
            'categoryId',
        );
        if (resultDeleteBrandWithCategoryId) {
            const commentService = new CommentService(MongoDB.client);
            const document = await commentService.deleteCategory(req.params.id);
            if (document) {
                res.send('delete success');
            } else {
                return next(new ApiError(404, 'Category not found'));
            }
        }
    } catch (error) {
        console.log(error);
    }
};
exports.getAll = async (req, res, next) => {
    let documents = [];

    try {
        const commentService = new CommentService(MongoDB.client);
        const { pi } = req.query;
        if (pi) {
            documents = await commentService.findByProductId(pi);
        } else {
            documents = await commentService.find({});
        }
    } catch (error) {
        // return next(new ApiError(500, 'Error when get all Category'));
        console.log(error);
    }
    return res.send(documents);
};
exports.findById = async (req, res, next) => {
    try {
        const commentService = new CommentService(MongoDB.client);
        const document = await commentService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Category not found '));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving Category with id = ${req.params.id}`));
    }
};
