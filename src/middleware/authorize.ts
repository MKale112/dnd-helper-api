import { Request, Response, NextFunction } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/auth';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const secretKey: string = config.get('jwtSecret');
  try {
    const token: string = req.header('x-auth-token') as string;
    if (!token) {
      return res.status(401).json(`Unauthorised. Requested header 'x-auth-token' not found.`);
    }

    const decoded = jwt.verify(token, secretKey) as UserPayload;

    // implement edge-case when user was deleted from the app/db while the token was still valid

    req.body.locals = decoded;
    next();
  } catch (err: any) {
    // unauthorized(err.message)
    res.status(500).json(`500 Server Error.`);
  }
};
