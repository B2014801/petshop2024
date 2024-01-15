const { ObjectId } = require('mongodb');
class ProductService {
    constructor(client) {
        // get collection product
        this.Product = client.db().collection('products');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProductData(payload, img) {
        if (img == null) {
            img = payload.img;
        }
        const product = {
            name: payload.name,
            price: payload.price,
            number: payload.number,
            discount: payload.discount,
            describe: payload.describe,
            img: img,
            brand: new ObjectId(payload.brand),
        };
        // Remove undefined fields
        Object.keys(product).forEach((key) => product[key] === undefined && delete product[key]);
        return product;
    }
    // create and save product
    async create(payload, img) {
        const product = this.extractProductData(payload, img);

        const { format, addDays } = require('date-fns');

        // Get the current date and format it as 'YYYY-MM-DD'
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
        product.createDate = formattedDate;
        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: {} },
            { returnDocument: 'after', upsert: true },
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        // console.log(await cursor.toArray());
        return await cursor.toArray();
    }
    // find product by name
    async findByName(name, exceptId) {
        try {
            // Input search term with accented characters
            var searchTerm = name.toUpperCase(); // Change this to the accented character you want to search for

            // Define a mapping of accented characters to regular expressions
            var map = {
                A: '[AÁÀÂÄÃẮẰẶ]',
                E: '[EÉÈÊË]',
                I: '[IÍÌÎÏ]',
                O: '[OÓÒÔÖÕỐ]',
                U: '[UÚÙÛÜỮ]',
                D: '[ĐD]',
                Đ: '[DĐ]',
                // Add more mappings for other accented characters as needed
            };

            var term = [];
            for (var i = 0; i < searchTerm.length; i++) {
                var char = searchTerm.charAt(i).toUpperCase();
                let spechar = [' ́', ' ̃', ' ̣', ' ̀'];
                spechar = spechar.map((char) => char.trim());
                // no add ? ~ . `
                if (!spechar.includes(char)) {
                    var reg = map[char];
                    if (reg) {
                        term.push(reg);
                    } else {
                        term.push(char); // If the character is not accented, add it as is
                    }
                }
            }

            var regexp = new RegExp(term.join(''));

            let filter = {
                name: { $regex: regexp, $options: 'i' },
            };
            if (exceptId) {
                filter._id = { $ne: new ObjectId(exceptId) };
            }
            const result = await this.Product.find(filter).toArray();
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async findByBrandId(id) {
        return await this.Product.find({
            //so sanh voi name trogn mongodb // khop chu khoa thuong : i
            brand: new ObjectId(id),
        }).toArray();
    }
    // find product by id
    async findById(id) {
        return await this.Product.findOne({
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

        const product = this.extractProductData(payload, img);

        const { format, addDays } = require('date-fns');

        // Get the current date and format it as 'YYYY-MM-DD'
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
        update.updateDate = formattedDate;
        // }
        const result = await this.Product.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
        return result.value;
    }
    //delete product
    async deleteProduct(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    // find favorite
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    // delete all product
    async deleteAllWithSameBrand(brandId) {
        const result = await this.Product.deleteMany({ brand: new ObjectId(brandId) });
        return result.deletedCount;
    }
    async findImgByName(imgName) {
        return await this.Product.findOne({ img: imgName });
    }
}

module.exports = ProductService;
