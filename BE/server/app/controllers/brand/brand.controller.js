const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const BrandService = require('../../services/brand.service');
const ProducController = require('../../services/product.service');
const fs = require('fs');
const path = require('path');

exports.home = async (req, res, next) => {
    res.send('wheo come home');
};

exports.getAllBrand = async (req, res, next) => {
    let documents = [];

    try {
        const brandService = new BrandService(MongoDB.client);
        const { categoryId } = req.query;
        if (categoryId) {
            documents = await brandService.getAllBrandWithCategoryId(categoryId);
        } else {
            documents = await brandService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, `Error when get all product ${error}`));
    }
    return res.send(documents);
};

exports.deleteBrand = async (req, res, next) => {
    try {
        const brandService = new BrandService(MongoDB.client);

        // get product and unlink

        const brandImg = await brandService.findById(req.params.id);
        const url = brandImg.img;
        const parts = url.split('/');
        // Get the last part of the URL, which should be the file name
        const fileName = parts[parts.length - 1];
        fs.unlinkSync(path.join(__dirname, `../../store/img/brand/${fileName}`));

        const document = await brandService.deleteBrand(req.params.id);

        if (document) {
            res.send('delete success');
        } else {
            return next(new ApiError(404, 'brand not found'));
        }
    } catch (error) {
        console.log(error);
    }
};
exports.findById = async (req, res, next) => {
    try {
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Product not found '));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving Product with id = ${req.params.id}`));
    }
};
exports.create = async (req, res, next) => {
    if (req.body.length === 0) {
        res.send('Data update can not be empty');
    }
    try {
        const img = await (process.env.SERVER_LINK_BRAND_IMG + req.file.filename);
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.create(req.body, img);
        res.send(document);
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res, next) => {
    if (req.body.length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const brandService = new BrandService(MongoDB.client);
        let img = null;
        if (req.file) {
            const productImg = await brandService.findById(req.params.id);
            const url = productImg.img;
            const parts = url.split('/');
            // Get the last part of the URL, which should be the file name
            const fileName = parts[parts.length - 1];
            fs.unlinkSync(path.join(__dirname, `../../store/img/brand/${fileName}`));
            img = await (process.env.SERVER_LINK_BRAND_IMG + req.file.filename);
        }
        const document = await brandService.update(req.params.id, req.body, img);
        if (!document) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send({ message: 'Product was updated successfully' });
    } catch (error) {
        return next(new ApiError(500, `Error updating Product with id=${req.params.id} ${error}`));
    }
};

exports.getProductImg = async (req, res, next) => {
    try {
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.findImgByName(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'img not found '));
        }
        const img = document.img;
        res.contentType('image/jpeg');
        return res.send(img);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving Product with id = ${error}`));
    }
};
exports.deleteBrandWithCategory = async (id, name) => {
    try {
        const brandService = new BrandService(MongoDB.client);

        // get product and unlink

        const brandWithField = await brandService.findByIdWithField(id, name);
        brandWithField.map(async (item, index) => {
            const url = item.img;
            const parts = url.split('/');
            // Get the last part of the URL, which should be the file name
            const fileName = parts[parts.length - 1];
            fs.unlinkSync(path.join(__dirname, `../../store/img/brand/${fileName}`));

            await brandService.deleteBrand(item._id);
        });
        return true;
    } catch (error) {
        return null;
    }
};
// remove img to another func
