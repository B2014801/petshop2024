const { ObjectId } = require('mongodb');
class Category {
    constructor(client) {
        // get collection Category
        this.Category = client.db().collection('categorys');
        this.Brand = client.db().collection('brands');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCategoryData(payload) {
        const Category = {
            name: payload.name,
        };
        // Remove undefined fields
        Object.keys(Category).forEach((key) => Category[key] === undefined && delete Category[key]);
        return Category;
    }
    async create(data) {
        try {
            const Category = this.extractCategoryData(data);
            const result = await this.Category.findOneAndUpdate(
                Category,
                { $set: {} },
                { returnDocument: 'after', upsert: true },
            );
            return result.value;
        } catch (error) {
            console.log(error);
        }
    }
    async find(filter) {
        const cursor = await this.Category.find(filter).toArray();
        await Promise.all(
            cursor.map(async (item, index) => {
                const brand = await this.Brand.find({ categoryId: item._id }).toArray();
                cursor[index].brand = brand;
            }),
        );
        return cursor;
        // return await cursor.toArray();
    }
    // find Category by name
    async findByName(name) {
        return await this.find({
            //so sanh voi name trogn mongodb // khop chu khoa thuong : i
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
    // find Category by id
    async findById(id) {
        return await this.Category.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    //update Category
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
        return result.value;
    }
    //delete Category
    async deleteCategory(id) {
        const result = await this.Category.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    // find favorite
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    // delete all Category
    async deleteAll() {
        const result = await this.Category.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = Category;
