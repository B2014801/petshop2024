const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const ProductService = require('../../services/product.service');
const { labelMap } = require('./labelMap');
const fs = require('fs');
const path = require('path');

exports.home = async (req, res, next) => {
    res.send('wheo come home');
};

exports.createProduct = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the product' + error));
    }
};
exports.findByImg = async (req, res, next) => {
    const { execFile } = require('child_process');
    // asynchronous;

    execFile(
        `python`,
        [path.join(__dirname, './DBC/Dog_Breed_Classification.py'), req.file.path],
        async (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stdout) {
                fs.unlinkSync(req.file.path);
                const breed = labelMap[stdout.trim()];
                let document = [];
                if (breed) {
                    const productService = new ProductService(MongoDB.client);
                    document = await productService.findByName(breed, null);
                }
                const respond = { breed: breed != '' ? breed : stdout.trim(), products: document };
                res.send(respond);
            }
        },
    );
};

exports.getAllProduct = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);
        const { name, brandId, exceptId } = req.query;
        if (name || exceptId) {
            documents = await productService.findByName(name, exceptId);
        }
        if (brandId) {
            documents = await productService.findByBrandId(brandId);
        }
        if (Object.keys(req.query).length == 0) {
            documents = await productService.find({});
        }
    } catch (error) {
        // return next(new ApiError(500, 'Error when get all product'));
        console.log(error);
    }
    return res.send(documents);
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);

        // get product and unlink

        const productImg = await productService.findById(req.params.id);
        const url = productImg.img;
        const parts = url.split('/');
        // Get the last part of the URL, which should be the file name
        const fileName = parts[parts.length - 1];
        fs.unlinkSync(path.join(__dirname, `../../store/img/product/${fileName}`));

        const document = await productService.deleteProduct(req.params.id);

        if (document) {
            res.send('delete success');
        } else {
            return next(new ApiError(404, 'Product not found'));
        }
    } catch (error) {
        console.log(error);
    }
};
exports.findById = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
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
        const img = await (process.env.SERVER_LINK_PRODUCT_IMG + req.file.filename);
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body, img);
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
        const productService = new ProductService(MongoDB.client);
        let img = null;
        if (req.file) {
            const productImg = await productService.findById(req.params.id);
            const url = productImg.img;
            const parts = url.split('/');
            // Get the last part of the URL, which should be the file name
            const fileName = parts[parts.length - 1];
            fs.unlinkSync(path.join(__dirname, `../../store/img/product/${fileName}`));
            img = await (process.env.SERVER_LINK_PRODUCT_IMG + req.file.filename);
        }
        const document = await productService.update(req.params.id, req.body, img);
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
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findImgByName(req.params.id);
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
// remove img to another func
