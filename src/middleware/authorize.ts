import { Request, Response, NextFunction } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/auth';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const unauthorized = (message: string) =>
    res.status(401).json({
      ok: false,
      status: 401,
      message: message,
    });
  const secretKey: string = config.get('jwtSecret');

  try {
    const token: string = req.header('x-auth-token') as string;
    if (!token) {
      unauthorized(`Unauthorised. Requested header 'x-auth-token' not found.`);
    }

    const decoded = jwt.verify(token, secretKey) as UserPayload;

    // implement edge-case when user was deleted from the app/db while the token was still valid

    req.body.locals = decoded;
    next();
  } catch (err) {
    unauthorized('');
  }
};
