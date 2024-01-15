const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const CartService = require('../../services/cart.service');

exports.getAllOfOneUser = async (req, res, next) => {
    let documents = [];

    try {
        const cartService = new CartService(MongoDB.client);
        documents = await cartService.find(req.params);
    } catch (error) {
        // return next(new ApiError(500, 'Error when get all product'));
        console.log(error);
    }
    return res.send(documents);
};
exports.create = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        console.log('miss body');
    }
    try {
        const cartService = new CartService(MongoDB.client);
        const result = await cartService.create(req.body);
        if (result) {
            res.send(result);
        }
        // else {
        //     return next(new ApiError(404, 'Duplicate Product '));
        // }
    } catch (error) {
        console.log(error);
    }
};
exports.updateAmount = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const documents = await cartService.updateAmount(req.params, req.body); //id user and array of amount
        if (documents) {
            res.send(documents);
        }
    } catch (error) {
        console.log(error);
    }
};
exports.deleteOneProduct = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const result = await cartService.deleteOneProduct(req.query); // id use and product id
        if (result) {
            res.send(result);
        } else {
            next(new ApiError(400, 'Product not found'));
        }
    } catch (error) {}
};
