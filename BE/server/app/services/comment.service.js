const { ObjectId } = require('mongodb');

class Comment {
    constructor(client) {
        // get collection Comment
        this.Comment = client.db().collection('comments');
        this.User = client.db().collection('users');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCommentData(payload) {
        const { format, addDays } = require('date-fns');

        // Get the current date and format it as 'YYYY-MM-DD'
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'HH:mm dd-MM-yyyy');
        const Comment = {
            content: payload.content,
            star: payload.star,
            url: payload.url,
            user_id: new ObjectId(payload.user_id),
            product_id: new ObjectId(payload.product_id),
            comment_date: formattedDate,
        };
        // Remove undefined fields
        Object.keys(Comment).forEach((key) => Comment[key] === undefined && delete Comment[key]);
        return Comment;
    }
    async create(data) {
        try {
            const Comment = this.extractCommentData(data);
            const result = await this.Comment.findOneAndUpdate(
                Comment,
                { $set: {} },
                { returnDocument: 'after', upsert: true },
            );
            let result2 = result.value;
            let user = await this.User.findOne({ _id: new ObjectId(result.value.user_id) });
            result2.user_name = user.name;
            result2.user_img = user.img;
            return result2;
        } catch (error) {
            console.log(error);
        }
    }
    async find(filter) {
        const cursor = await this.Comment.find(filter).toArray();

        return cursor;
        // return await cursor.toArray();
    }
    // find Comment by name
    async findByProductId(product_id) {
        const cursor = await this.Comment.aggregate([
            {
                $match: {
                    product_id: new ObjectId(product_id),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_data',
                },
            },
            {
                $unwind: '$user_data', // thao mang ra con lai object
            },
            {
                $project: {
                    star: 1,
                    content: 1,
                    comment_date: 1,
                    'user_data.img': 1,
                    'user_data.name': 1,
                },
            },
        ]);
        return cursor.toArray();
    }
    // find Comment by id
    async findById(id) {
        return await this.Comment.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    //update Comment
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractCommentData(payload);
        const result = await this.Comment.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
        return result.value;
    }
    //delete Comment
    async deleteComment(id) {
        const result = await this.Comment.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    // find favorite
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    // delete all Comment
    async deleteAll() {
        const result = await this.Comment.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = Comment;
