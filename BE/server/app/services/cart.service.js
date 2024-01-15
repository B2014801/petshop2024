const { ObjectId } = require('mongodb');
class CartService {
    constructor(client) {
        // get collection product
        this.Cart = client.db().collection('carts');
        this.Cart.createIndex({ UserId: 1, ProductId: 1 }, { unique: true });

        // this.Product = client.db().collection('products');
        // this.User = client.db().collection('users');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCartData(payload) {
        const cart = {
            ProductId: new ObjectId(payload.ProductId),
            UserId: new ObjectId(payload.UserId),
            Amount: payload.Amount,
        };
        // Remove undefined fields
        Object.keys(cart).forEach((key) => cart[key] === undefined && delete cart[key]);
        return cart;
    }
    // create and save cart
    async create(payload) {
        try {
            const cart = this.extractCartData(payload);
            const result = await this.Cart.findOneAndUpdate(
                cart,
                { $set: {} },
                { returnDocument: 'after', upsert: true },
            );

            // if (result.lastErrorObject.updatedExisting) {
            //     return false;
            // } else {

            return result.lastErrorObject;
            // }
        } catch (error) {
            return true;
            // console.log(error);
        }
    }
    async find(Userid) {
        const cursor = await this.Cart.aggregate([
            {
                $match: {
                    UserId: new ObjectId(Userid), // Filter by UserId = 'a'
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'ProductId',
                    foreignField: '_id',
                    as: 'ProductData',
                },
            },
            {
                $unwind: '$ProductData', // thao mang ra con lai object
            },
        ]);

        const result = await cursor.toArray(); // Convert the cursor to an array

        return result;
    }
    async updateAmount(id, data) {
        try {
            data.forEach((item, index) => {
                const updateCriteria = { UserId: new ObjectId(id), ProductId: new ObjectId(item.ProductData._id) };
                const updateQuery = {
                    $set: {
                        Amount: item.Amount,
                    },
                };
                this.Cart.updateOne(updateCriteria, updateQuery, function (err, result) {
                    if (err) throw err;
                    console.log(`Document updated for UserId: ${item.UserId}`);
                });
            });
        } catch (error) {
            return false;
            console.log(error);
        }
        return true;
    }
    async deleteOneProduct(data) {
        const result = await this.Cart.findOneAndDelete({
            UserId: new ObjectId(data.UserId),
            ProductId: new ObjectId(data.ProductId),
        });
        return result;
    }
}
module.exports = CartService;
