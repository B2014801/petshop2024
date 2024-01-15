const { ObjectId } = require('mongodb');

class UserService {
    constructor(client) {
        this.User = client.db().collection('users');
    }
    extractUserData(payload, img) {
        if (img == null) {
            img = payload.img;
        }
        const user = {
            name: payload.name,
            password: payload.password,
            phone: payload.phone,
            address: payload.address,
            img: img,
        };
        // Remove undefined fields
        Object.keys(user).forEach((key) => user[key] === undefined && delete user[key]);
        return user;
    }
    async findById(id) {
        return await this.User.findOne({
            _id: new ObjectId(id),
        });
    }
    async findAll() {
        return (await this.User.find({})).toArray();
    }
    async update(payload, img) {
        try {
            const filter = {
                _id: ObjectId.isValid(payload._id) ? new ObjectId(payload._id) : null,
            };
            // if (img) {
            const update = this.extractUserData(payload, img);
            // }
            const result = await this.User.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
            if (result) {
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = UserService;
