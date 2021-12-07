import { Router } from 'express';
import usersRouter from './users';
import authRouter from './auth';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/auth', authRouter);

export default routes;
