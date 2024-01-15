const socketIO = require('socket.io');

let io; // Declare a variable to store the io instance globally

exports.initSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: ['http://localhost:3001', 'http://localhost:3002'],
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        // console.log('A user connected');

        // socket.on('chat message', (message) => {
        //     // Handle the chat message and broadcast it
        //     io.emit('chat message', message);
        // });

        socket.on('disconnect', () => {
            // console.log('A user disconnected');
        });
    });
};

exports.getIo = () => {
    if (!io) {
        throw new Error('Socket.io has not been initialized.');
    }
    return io;
};
