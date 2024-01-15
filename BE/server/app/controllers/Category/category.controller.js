const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const CategoryService = require('../../services/category.service');
const BrandController = require('../brand/brand.controller');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the category' + error));
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.update(req.params.id, req.body);
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
            const categoryService = new CategoryService(MongoDB.client);
            const document = await categoryService.deleteCategory(req.params.id);
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
exports.getAllCategory = async (req, res, next) => {
    let documents = [];

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await categoryService.findByName(name);
        } else {
            documents = await categoryService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'Error when get all Category'));
    }
    return res.send(documents);
};
exports.findById = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Category not found '));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving Category with id = ${req.params.id}`));
    }
};
