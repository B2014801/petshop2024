const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const InvoiceService = require('../../services/invoice.service');
const { default: add } = require('date-fns/add/index.js');
const socket = require('../../socket/socketio');
const NotificationService = require('../../services/notification.service');

exports.create = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const documents = await invoiceService.create(req.body);
        const io = socket.getIo();
        let notification = {
            userId: documents.id,
            title: 'Đã đặt một đơn hàng',
            url: '/order',
        };
        //broadcast message to admin
        io.emit('gotNewInvoice', documents);

        const notificationService = new NotificationService(MongoDB.client);
        await notificationService.create(notification);

        res.send(documents);
    } catch (error) {
        console.log(error);
    }
};

exports.getAllInvoice = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const documents = await invoiceService.getAllInvoice(null, null);
        if (documents) {
            res.send(documents);
        } else {
            console.log('co loi xay ra');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getAllInvoiceOfOneUser = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const { state, userid } = req.query;
        const documents = await invoiceService.getAllInvoice(state, userid);
        if (documents) {
            res.send(documents);
        } else {
            console.log('co loi xay ra');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const result = await invoiceService.updateStatus(req.body);
        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
};
exports.getRevenue = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const documents = await invoiceService.getRevenueWith();
        res.send(documents);
    } catch (error) {
        console.log(error);
    }
};
