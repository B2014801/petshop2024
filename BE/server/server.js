const app = require('./app');
const config = require('./app/config');
const MongoDB = require('./app/utils/mongodb.util');
const http = require('http'); // Add this line
const socketChat = require('./app/socket/socketio');
async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log('Connected to the database!');

        const PORT = config.app.port;

        // Create an HTTP server instance
        const server = http.createServer(app);

        // Attach Socket.io to the server
        socketChat.initSocket(server);

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Cannot connect to the database!', config);
        process.exit();
    }
}

startServer();
