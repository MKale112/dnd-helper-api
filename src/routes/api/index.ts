import { Router } from 'express';
import usersRouter from './users';
import authRouter from './auth';
import characterRouter from './characters';
import campaignRouter from './campaigns';
import sessionRouter from './session';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/auth', authRouter);
routes.use('/api/characters', characterRouter);
routes.use('/api/campaigns', campaignRouter);
routes.use('/api/session', sessionRouter);

export default routes;
