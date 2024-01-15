const { ObjectId } = require('mongodb');
class Voucher {
    constructor(client) {
        // get collection Voucher
        this.Vouchers = client.db().collection('vouchers');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractVoucherData(payload) {
        const Voucher = {
            name: payload.name,
            discount: payload.discount,
            describe: payload.describe,
            status: payload.status,
            expired_date: payload.expired_date,
        };
        // Remove undefined fields
        Object.keys(Voucher).forEach((key) => Voucher[key] === undefined && delete Voucher[key]);
        return Voucher;
    }
    async create(data) {
        try {
            const Voucher = this.extractVoucherData(data);
            const result = await this.Vouchers.findOneAndUpdate(
                Voucher,
                { $set: {} },
                { returnDocument: 'after', upsert: true },
            );
            return result.value;
        } catch (error) {
            console.log(error);
        }
    }
    async find(filter) {
        const cursor = await this.Vouchers.find(filter).toArray();

        return cursor;
        // return await cursor.toArray();
    }
    // find Voucher by name
    async findByName(name) {
        return await this.find({
            //so sanh voi name trogn mongodb // khop chu khoa thuong : i
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
    // find Voucher by id
    async findById(id) {
        return await this.Vouchers.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    //update Voucher
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractVoucherData(payload);
        const result = await this.Vouchers.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
        return result.value;
    }
    //delete Voucher
    async delete(id) {
        const result = await this.Vouchers.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    // find favorite

    // delete all Voucher
    async deleteAll() {
        const result = await this.Vouchers.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = Voucher;
