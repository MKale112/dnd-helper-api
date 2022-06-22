import express from 'express';
// import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';
import routes from './routes/api/index';
import connectDB from '../config/db';

const app = express();
connectDB();

// middleware
// app.use(cors);
app.use(express.json());

app.use(routes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] } });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  socket.on('setup', () => {
    socket.emit('connected');
  });
});
