import express from 'express';
import routes from './routes/api/index';
import connectDB from '../config/db';
// import usersRouter from './routes/api/users';

const app = express();
connectDB();

// middleware
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
