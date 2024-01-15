const { ObjectId } = require('mongodb');
class NotificationService {
    constructor(client) {
        this.Notification = client.db().collection('notification');
        this.User = client.db().collection('users');
    }

    extractNotificationData(payload) {
        const { format, addDays } = require('date-fns');

        // Get the current date and format it as 'YYYY-MM-DD'
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'HH:mm dd-MM-yyyy');
        const notification = {
            userId: payload.userId,
            title: payload.title,
            url: payload.url,
            date: formattedDate,
        };
        Object.keys(notification).forEach((key) => notification[key] === undefined && delete notification[key]);
        return notification;
    }

    async create(data) {
        try {
            let notification = this.extractNotificationData(data);
            let result = await this.Notification.insertOne(notification);

            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        let documents = await this.Notification.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'Data',
                },
            },
            {
                $unwind: '$Data', // thao mang ra con lai object
            },
            {
                $project: {
                    title: 1,
                    url: 1,
                    date: 1,
                    'Data.img': 1,
                    'Data.name': 1,
                },
            },
            {
                $sort: { _id: -1 },
            },
        ]);
        if (documents) {
            return documents.toArray();
        }
    }
}
module.exports = NotificationService;
