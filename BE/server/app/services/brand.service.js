const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');
class BrandService {
    constructor(client) {
        // get collection product
        this.Brand = client.db().collection('brands');
        this.Product = client.db().collection('products');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProductData(payload, img) {
        if (img == null) {
            img = payload.img;
        }
        const product = {
            name: payload.name,
            img: img,
            categoryId: new ObjectId(payload.categoryId),
        };
        // Remove undefined fields
        Object.keys(product).forEach((key) => product[key] === undefined && delete product[key]);
        return product;
    }
    // create and save product
    async create(payload, img) {
        const product = this.extractProductData(payload, img);
        const result = await this.Brand.findOneAndUpdate(
            product,
            { $set: {} },
            { returnDocument: 'after', upsert: true },
        );

        return result.value;
    }

    async find(filter) {
        const cursor = await this.Brand.find(filter);
        // console.log(await cursor.toArray());
        return await cursor.toArray();
    }
    // find product by name
    async getAllBrandWithCategoryId(id) {
        const Brand = await this.Brand.find({
            categoryId: new ObjectId(id),
        });
        return Brand.toArray();
    }
    // find product by id
    async findById(id) {
        return await this.Brand.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    //update product
    async update(id, payload, img) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        // if (img) {
        const update = this.extractProductData(payload, img);
        // }
        const result = await this.Brand.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
        return result.value;
    }
    //delete brand
    async deleteBrand(id) {
        try {
            const productWithBrand = await this.Product.find({ brand: new ObjectId(id) }).toArray();
            productWithBrand.map(async (item, index) => {
                const url = item.img;
                const parts = url.split('/');
                // Get the last part of the URL, which should be the file name
                const fileName = parts[parts.length - 1];
                fs.unlinkSync(path.join(__dirname, `../store/img/product/${fileName}`));

                await this.Product.findOneAndDelete({ _id: item._id });
            });
            const delete_brand_result = await this.Brand.findOneAndDelete({
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
            if (delete_brand_result) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    // find favorite
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    // delete all product
    async deleteAll() {
        const result = await this.Brand.deleteMany({});
        return result.deletedCount;
    }
    async findImgByName(imgName) {
        return await this.Brand.findOne({ img: imgName });
    }
    async findByIdWithField(id, fieldName) {
        const query = {};
        query[fieldName] = ObjectId.isValid(id) ? new ObjectId(id) : null;

        const result = await this.Brand.find(query).toArray();
        return result;
    }
}

module.exports = BrandService;
