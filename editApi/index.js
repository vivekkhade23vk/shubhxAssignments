const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/config");
const documentRoutes = require("./routes/routes");

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', documentRoutes);

const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(port, () => {
    connectDB();
    console.log(`Server listening on port 8080`);
});
