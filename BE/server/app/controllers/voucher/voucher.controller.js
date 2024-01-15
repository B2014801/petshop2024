const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const VoucherService = require('../../services/voucher.service');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const voucherService = new VoucherService(MongoDB.client);
        const document = await voucherService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the voucher' + error));
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const voucherService = new VoucherService(MongoDB.client);
        const document = await voucherService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'voucher not founds'));
        }
        return res.send({ message: 'voucher was updated successfully' });
    } catch (error) {
        return next(new ApiError(500, `Error updating voucher with id=${req.params.id} ${error}`));
    }
};
exports.delete = async (req, res, next) => {
    try {
        const voucherService = new VoucherService(MongoDB.client);
        const document = await voucherService.delete(req.params.id);
        if (document) {
            res.send('delete success');
        } else {
            return next(new ApiError(404, 'voucher not found'));
        }
    } catch (error) {
        console.log(error);
    }
};
exports.getAll = async (req, res, next) => {
    let documents = [];

    try {
        const voucherService = new VoucherService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await voucherService.findByName(name);
        } else {
            documents = await voucherService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'Error when get all voucher'));
    }
    return res.send(documents);
};
exports.findById = async (req, res, next) => {
    try {
        const voucherService = new VoucherService(MongoDB.client);
        const document = await voucherService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'voucher not found '));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving voucher with id = ${req.params.id}`));
    }
};
