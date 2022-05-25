import { Router } from 'express';
import usersRouter from './users';
import authRouter from './auth';
import characterRouter from './characters';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/auth', authRouter);
routes.use('/api/characters', characterRouter);

export default routes;
